const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const multer = require("multer");
const { createHash } = require("node:crypto");
const path = require("node:path");

const MAX_TOTAL_BYTES = 3 * 1024 * 1024;
const MAX_FILES = 5;
const PROJECTS = {
  kitchen: "Cocina", bathroom: "Baño", floors_walls: "Pisos o paredes",
  stairs: "Escaleras", commercial: "Comercial", other: "Otro"
};
const TYPES = { ".pdf": "application/pdf", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const fail = (status, message) => Object.assign(new Error(message), { status });

function validSignature(file) {
  const buffer = file.buffer;
  switch (TYPES[path.extname(file.originalname).toLowerCase()]) {
    case "application/pdf": return buffer.subarray(0, 5).toString() === "%PDF-";
    case "image/jpeg": return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png": return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    case "image/webp": return buffer.length >= 12 && buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
    default: return false;
  }
}

function validateFields(body) {
  const values = {};
  for (const [key, max] of Object.entries({ name: 120, email: 254, phone: 40, project_type: 30, message: 3000 })) {
    if (typeof body[key] !== "string" || !body[key].trim() || body[key].length > max) throw fail(400, "Revisa los campos de tu solicitud.");
    values[key] = body[key].trim();
  }
  if (/[\r\n\x00-\x1f\x7f]/.test(values.name + values.email + values.phone) ||
      !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email) ||
      !/^[+\d\s().-]+$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7 ||
      !Object.hasOwn(PROJECTS, values.project_type)) throw fail(400, "Revisa el nombre, email, teléfono y tipo de proyecto.");
  return values;
}

function buildEmail(values, files, now = new Date()) {
  const date = now.toLocaleDateString("es-PR", { timeZone: "America/Puerto_Rico", year: "numeric", month: "long", day: "numeric" });
  const rows = [["Nombre", values.name], ["Email", values.email], ["Teléfono", values.phone], ["Tipo de proyecto", PROJECTS[values.project_type]], ["Fecha de solicitud", date]];
  const attachments = files.map(file => ({
    filename: path.basename(file.originalname.replace(/\\/g, "/")).replace(/[\x00-\x1f\x7f]/g, "").slice(0, 180),
    content: file.buffer.toString("base64"), content_type: TYPES[path.extname(file.originalname).toLowerCase()]
  }));
  const fileNames = attachments.map(file => file.filename).join(", ") || "Sin archivos adjuntos";
  return {
    from: "TecnoMármol Cotizaciones <cotizaciones@tecnomarmolpr.com>", to: ["info@tecnomarmolpr.com"], reply_to: values.email,
    subject: `Nueva cotización — ${values.name}`,
    text: `NUEVA SOLICITUD DE COTIZACIÓN\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nInformación del proyecto:\n${values.message}\n\nAdjuntos: ${fileNames}`,
    html: `<!doctype html><html lang="es"><body style="margin:0;background:#f4f3f0;font-family:Arial,sans-serif;color:#25231e"><div style="max-width:600px;margin:24px auto;background:#fff;padding:32px;border-top:4px solid #a48b5f"><p style="color:#8c744b;letter-spacing:2px">TECNOMÁRMOL, INC.</p><h1 style="font-size:22px">Nueva solicitud de cotización</h1><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="text-align:left;padding:10px 8px;border-bottom:1px solid #eee">${label}</th><td style="padding:10px 8px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="font-size:17px">Información del proyecto</h2><p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(values.message)}</p><h2 style="font-size:17px">Archivos adjuntos</h2><p>${escapeHtml(fileNames)}</p><p style="font-size:13px;color:#666">Responde a este correo para comunicarte con el cliente.</p></div></body></html>`, attachments
  };
}

function createApp({ env = process.env, fetchImpl = global.fetch, rateLimitMax = 5 } = {}) {
  const app = express();
  if (env.VERCEL) app.set("trust proxy", 1);
  const allowedOrigins = new Set(["https://tecnomarmolpr.com", "https://www.tecnomarmolpr.com", "https://pxchecoo.github.io", ...(env.ALLOWED_ORIGINS || "").split(",").map(origin => origin.trim()).filter(Boolean)]);
  app.use(helmet());
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && !allowedOrigins.has(origin)) return res.status(403).json({ ok: false, message: "Origen no permitido." });
    next();
  });
  app.use(cors({ origin: [...allowedOrigins], methods: ["POST", "GET", "OPTIONS"], allowedHeaders: ["Content-Type", "Accept"] }));
  app.use((req, res, next) => { res.set("Cache-Control", "no-store"); next(); });
  app.get("/health", (req, res) => res.json({ ok: true, service: "TecnoMarmol Quote Backend", emailConfigured: Boolean(env.RESEND_API_KEY) }));
  const upload = multer({
    storage: multer.memoryStorage(), limits: { files: MAX_FILES, fileSize: MAX_TOTAL_BYTES, fields: 12, fieldSize: 12000, parts: 17 },
    fileFilter(req, file, cb) {
      const type = TYPES[path.extname(file.originalname).toLowerCase()];
      if (!type || file.mimetype !== type) return cb(fail(400, "Adjunta solamente PDF, JPG, PNG o WEBP."));
      cb(null, true);
    }
  });
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: rateLimitMax, standardHeaders: "draft-8", legacyHeaders: false, message: { ok: false, message: "Has enviado varias solicitudes. Intenta de nuevo en 15 minutos." } });
  app.post(["/api/cotizacion", "/api/quote"], limiter, (req, res, next) => {
    if (!req.is("multipart/form-data")) return next(fail(415, "Formato de solicitud no válido."));
    if (Number(req.get("content-length")) > MAX_TOTAL_BYTES + 65536) return next(fail(413, "Los archivos no pueden pasar de 3 MB en total."));
    next();
  }, upload.array("attachments", MAX_FILES), async (req, res, next) => {
    try {
      if (typeof req.body.website === "string" && req.body.website.trim()) return res.json({ ok: true });
      const values = validateFields(req.body);
      const files = req.files || [];
      if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) throw fail(413, "Los archivos no pueden pasar de 3 MB en total.");
      if (files.some(file => !file.size || !validSignature(file))) throw fail(400, "Uno de los archivos no corresponde al formato permitido.");
      if (!env.RESEND_API_KEY) throw fail(503, "El servicio de cotizaciones no está disponible. Intenta nuevamente más tarde.");
      const email = buildEmail(values, files);
      // Identical submissions on one date reuse a key, including after a timeout.
      const idempotencyKey = `cotizacion-${createHash("sha256").update(JSON.stringify(email)).digest("hex")}`;
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(20000),
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey }, body: JSON.stringify(email)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || typeof result.id !== "string" || !result.id) throw fail(502, "No pudimos enviar tu solicitud. Intenta nuevamente.");
      res.json({ ok: true });
    } catch (error) { next(error); }
  });
  app.all(["/api/cotizacion", "/api/quote"], (req, res) => res.set("Allow", "POST, OPTIONS").status(405).json({ ok: false, message: "Método no permitido." }));
  app.use((error, req, res, next) => {
    let status = error.status || 502;
    let message = error.status ? error.message : "No pudimos enviar tu solicitud. Intenta nuevamente.";
    if (error instanceof multer.MulterError) {
      status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      message = error.code === "LIMIT_FILE_SIZE" ? "Los archivos no pueden pasar de 3 MB en total." : "Adjunta hasta 5 archivos y revisa los campos de la solicitud.";
    }
    res.status(status).json({ ok: false, message });
  });
  return app;
}
module.exports = { createApp, buildEmail };

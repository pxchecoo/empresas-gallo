const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("./quote-app");
const ORIGIN = "https://tecnomarmolpr.com";
const pdf = Buffer.from("%PDF-1.4\nTest attachment\n%%EOF");

function form(overrides = {}, files = []) {
  const body = new FormData();
  const fields = { name: "Cliente de prueba", email: "cliente@example.com", phone: "787-555-1234", project_type: "kitchen", message: "Necesito un tope de granito.", website: "", language: "es", ...overrides };
  for (const [key, value] of Object.entries(fields)) body.append(key, value);
  for (const file of files) body.append("attachments", new Blob([file.content], { type: file.type || "application/pdf" }), file.name || "plano.pdf");
  return body;
}

async function setup(t, options = {}) {
  const sent = [];
  const fetchImpl = async (url, init) => {
    sent.push({ url, ...init, payload: JSON.parse(init.body) });
    return Response.json({ id: "email-test-id" });
  };
  const app = createApp({ env: { RESEND_API_KEY: "test-key" }, fetchImpl, rateLimitMax: 100, ...options });
  const server = app.listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (body, route = "/api/cotizacion", origin = ORIGIN) => fetch(url + route, { method: "POST", headers: { Origin: origin }, body });
  return { sent, url, post };
}

test("multipart email includes actual attachments, fixed recipient, reply-to, and escaped HTML", async t => {
  const { sent, post } = await setup(t);
  const response = await post(form({ name: "Ana <b>Gallo</b>", message: '<script>alert("x")</script>\nGranito', to: "attacker@example.com" }, [{ content: pdf }]));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  const email = sent[0].payload;
  assert.deepEqual(email.to, ["info@tecnomarmolpr.com"]);
  assert.equal(email.reply_to, "cliente@example.com");
  assert.equal(email.from, "TecnoMármol Cotizaciones <cotizaciones@tecnomarmolpr.com>");
  assert.equal(Buffer.from(email.attachments[0].content, "base64").toString(), pdf.toString());
  assert.equal(email.attachments[0].filename, "plano.pdf");
  assert.ok(email.html.includes("&lt;script&gt;"));
  assert.ok(!email.html.includes("<script>"));
  assert.ok(email.text.includes("Información del proyecto"));
});

test("both endpoint names work and identical retries reuse the idempotency key", async t => {
  const { sent, post } = await setup(t);
  assert.equal((await post(form(), "/api/quote")).status, 200);
  assert.equal((await post(form())).status, 200);
  assert.equal(sent[0].headers["Idempotency-Key"], sent[1].headers["Idempotency-Key"]);
});

test("invalid fields, duplicate fields, and header injection never send", async t => {
  const { sent, post } = await setup(t);
  for (const fields of [{ email: "wrong" }, { phone: "abc" }, { project_type: "invalid" }, { name: "A\r\nBcc: x@y.com" }, { message: "" }, { name: "x".repeat(121) }]) assert.equal((await post(form(fields))).status, 400);
  const duplicate = form(); duplicate.append("email", "other@example.com");
  assert.equal((await post(duplicate)).status, 400);
  assert.equal(sent.length, 0);
});

test("unsupported files, forged signatures, count and total size are rejected", async t => {
  const { sent, post } = await setup(t);
  const cases = [
    [{ content: pdf, name: "plan.dwg", type: "application/octet-stream" }],
    [{ content: "fake pdf" }],
    [{ content: pdf, type: "image/png" }],
    Array.from({ length: 6 }, () => ({ content: pdf })),
    [{ content: Buffer.concat([pdf, Buffer.alloc(3 * 1024 * 1024)]) }],
    Array.from({ length: 2 }, () => ({ content: Buffer.concat([pdf, Buffer.alloc(1600000)]) }))
  ];
  for (const files of cases) assert.ok([400, 413].includes((await post(form({}, files))).status));
  assert.equal(sent.length, 0);
});

test("honeypot is discarded, foreign origin blocked, and CORS preflight works", async t => {
  const { sent, post, url } = await setup(t);
  assert.equal((await post(form({ website: "spam" }))).status, 200);
  assert.equal((await post(form(), "/api/cotizacion", "https://foreign.example")).status, 403);
  const options = await fetch(url + "/api/cotizacion", { method: "OPTIONS", headers: { Origin: ORIGIN, "Access-Control-Request-Method": "POST" } });
  assert.equal(options.status, 204);
  assert.equal(options.headers.get("access-control-allow-origin"), ORIGIN);
  assert.equal(sent.length, 0);
});

test("missing credentials and provider rejection never report success or leak secrets", async t => {
  const missing = await setup(t, { env: {} });
  assert.equal((await missing.post(form())).status, 503);
  assert.equal(missing.sent.length, 0);
  for (const fetchImpl of [async () => Response.json({ error: "test-key" }, { status: 403 }), async () => { throw new Error("test-key"); }, async () => Response.json({})]) {
    const failing = await setup(t, { fetchImpl });
    const response = await failing.post(form());
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.ok(!JSON.stringify(body).includes("test-key"));
  }
});

test("rate limit, allowed methods, and JSON rejection", async t => {
  const { post, url } = await setup(t, { rateLimitMax: 1 });
  assert.equal((await fetch(url + "/api/cotizacion")).status, 405);
  assert.equal((await post(form())).status, 200);
  const blocked = await post(form());
  assert.equal(blocked.status, 429);
  assert.ok(blocked.headers.get("retry-after"));
  const separate = await setup(t);
  const json = await fetch(separate.url + "/api/cotizacion", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
  assert.equal(json.status, 415);
});

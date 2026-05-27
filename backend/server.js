require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

const PORT = process.env.PORT || 8787;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(helmet());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "TecnoMarmol Quote Backend" });
});

app.post("/api/quote", (req, res) => {
  console.log("Quote received:", req.body);

  if (process.env.DRY_RUN === "true") {
    return res.json({
      ok: true,
      dryRun: true,
      message: "Quote received but email not sent."
    });
  }

  res.json({
    ok: true,
    message: "Quote received."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});


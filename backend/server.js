require("dotenv").config();
const express = require("express");
const { createApp } = require("./quote-app");
const app = createApp({ app: express() });
module.exports = app;
if (require.main === module) app.listen(process.env.PORT || 8787, "0.0.0.0", () => console.log("TecnoMarmol Quote Backend ready"));

require("dotenv").config();
const { createApp } = require("./quote-app");
const app = createApp();
module.exports = app;
if (require.main === module) app.listen(process.env.PORT || 8787, "0.0.0.0", () => console.log("TecnoMarmol Quote Backend ready"));

// gameverse_backend/index.js
// Archivo de entrada para Vercel (Serverless Function)

const app = require("./src/app");

// Vercel requiere que exportemos la app sin app.listen()
module.exports = app;

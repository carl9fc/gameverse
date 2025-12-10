const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');
const { app: appConfig } = require('./config/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'GameVerse API' }));

// Rutas API
app.use('/api', routes);

// ❗ IMPORTANTE:
// NO ejecutar sequelize.sync() en ambiente serverless (Vercel)
// para evitar loops y recreación constante de la BD.
//
// Solo ejecuta sync en desarrollo local:
//
// if (process.env.NODE_ENV !== "production") {
//     sequelize.sync({ alter: true })
//       .then(() => console.log("DB synced"))
//       .catch(err => console.error("DB sync error", err));
// }

module.exports = app;


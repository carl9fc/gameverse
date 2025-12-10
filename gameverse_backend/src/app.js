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
app.use('/api', routes);

async function syncDB() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
  } catch (err) {
    console.error('DB sync error', err);
  }
}
syncDB();

module.exports = app;

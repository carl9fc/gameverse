const { Sequelize } = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  logging: db.logging
});

module.exports = sequelize;

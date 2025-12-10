require('dotenv').config();
module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'fernan1834k',
    database: process.env.DB_NAME || 'gameverse',
    dialect: 'postgres',
    logging: false
  },
  app: {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'supersecreto'
  }
};

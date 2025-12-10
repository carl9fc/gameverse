const jwt = require('jsonwebtoken');
const { app } = require('../config/config');

const JWT_SECRET = app?.jwtSecret || process.env.JWT_SECRET || 'secret_key_2025';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return next();

  const parts = authHeader.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    console.warn('Invalid token', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const gameRoutes = require('./games');
const reviewRoutes = require('./reviews');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
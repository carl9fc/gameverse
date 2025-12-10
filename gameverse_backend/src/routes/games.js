const express = require('express');
const { body, query } = require('express-validator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.get(
  '/',
  [
    query('q').optional().isString(),
    query('genre').optional().isString(),
    query('platform').optional().isString(),
    query('page').optional().isInt(),
    query('limit').optional().isInt()
  ],
  validate,
  gameController.listGames
);

router.get('/top', gameController.topGames);
router.get('/:id', gameController.getGame);

router.post(
  '/',
  auth,
  role('admin'),
  [
    body('title').notEmpty().withMessage('title required'),
    body('genre').notEmpty().withMessage('genre required'),
    body('platform').notEmpty().withMessage('platform required')
  ],
  validate,
  gameController.createGame
);

router.put('/:id', auth, role('admin'), gameController.updateGame);
router.delete('/:id', auth, role('admin'), gameController.deleteGame);

module.exports = router;
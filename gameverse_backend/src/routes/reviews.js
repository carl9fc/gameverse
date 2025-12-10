const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get(
  '/:gameId',
  [param('gameId').isInt().withMessage('gameId must be integer')],
  validate,
  reviewController.listReviews
);

router.post(
  '/:gameId',
  auth,
  [
    param('gameId').isInt().withMessage('gameId must be integer'),
    body('comment').notEmpty().withMessage('comment required'),
    body('rating').optional().isInt({ min: 1, max: 5 })
  ],
  validate,
  reviewController.createReview
);

router.delete(
  '/:id',
  auth,
  [param('id').isInt().withMessage('id must be integer')],
  validate,
  reviewController.deleteReview
);

module.exports = router;

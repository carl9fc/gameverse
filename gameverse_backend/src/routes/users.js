const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', auth, userController.getProfile);
router.put('/me', auth, [
  body('name').optional().isString(),
  body('password').optional().isLength({ min: 6 })
], validate, userController.updateProfile);

router.get('/', auth, role('admin'), userController.listUsers);
router.delete('/:id', auth, role('admin'), userController.deleteUser);

module.exports = router;

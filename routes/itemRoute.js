const express = require('express');
const router = express.Router();

const { authMiddleware, authPermission } = require('../middlewares/auth');

const {
  getItems,
  getItem,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', getItems);
router.get('/:id', getItem);
router.delete('/:id', authMiddleware, authPermission, deleteItem);

module.exports = router;

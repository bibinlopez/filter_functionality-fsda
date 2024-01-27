const express = require('express');
const router = express.Router();

const { authMiddleware, authPermission } = require('../middlewares/auth');

const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');

router.get('/getAllUser', authMiddleware, authPermission, getAllUser); // admin route
router.post('/getSingleUser', authMiddleware, authPermission, getSingleUser); // admin route
router.get('/showMe', authMiddleware, showCurrentUser); // user route
router.post('/updateUser', authMiddleware, updateUser); // user route
router.post('/updateUserPassword', authMiddleware, updateUserPassword); // user route

module.exports = router;

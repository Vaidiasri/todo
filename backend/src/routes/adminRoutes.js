const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, updateUser } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/roleMiddleware');

router.route('/users')
    .get(protect, admin, getUsers);

router.route('/users/:id')
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

module.exports = router;

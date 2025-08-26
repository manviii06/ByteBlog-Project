const express = require('express');
const router = express.Router();
const { getAdminInsights, getRecentBlogs, getAllUsers, getUserById } = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');
const {  getSubscriber } = require('../controllers/userController');

router.get('/insights', authMiddleware, adminOnly, getAdminInsights);
router.get('/insights/recent-blogs', authMiddleware, adminOnly, getRecentBlogs);
router.get("/get-subscribers",authMiddleware, adminOnly, getSubscriber);

router.get('/users', authMiddleware, adminOnly, getAllUsers);

// Get single user details by ID
router.get('/users/:id', authMiddleware, adminOnly, getUserById);

module.exports = router;

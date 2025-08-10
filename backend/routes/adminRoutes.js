const express = require('express');
const router = express.Router();
const { getAdminInsights, getRecentBlogs } = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');
const {  getSubscriber } = require('../controllers/userController');

router.get('/insights', authMiddleware, adminOnly, getAdminInsights);
router.get('/insights/recent-blogs', authMiddleware, adminOnly, getRecentBlogs);
router.get("/get-subscribers",authMiddleware, adminOnly, getSubscriber);

module.exports = router;

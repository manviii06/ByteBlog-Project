const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLikeBlog,
  getAllBlogs,
  getSingleBlog
} = require('../controllers/blogController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/blogs', getAllBlogs);
router.route('/').post(authMiddleware, createBlog).get(getBlogs);
router.route('/:id').get(getBlogById).put(authMiddleware, updateBlog).delete(authMiddleware, deleteBlog);
router.put('/:id/like', authMiddleware, toggleLikeBlog)
router.get('/blogs/:id', getSingleBlog);

module.exports = router;

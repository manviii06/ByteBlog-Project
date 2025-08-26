const express = require('express');
const multer = require('multer');
const { 
  createBlog, 
  getBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  toggleLikeBlog, 
  getAllBlogs,
  getSingleBlog,
  addComment
} = require('../controllers/blogController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getSingleBlog);
router.get('/', getBlogs);                        // Get all blogs
router.get('/:id', getBlogById);                  // Get single blog by ID
router.post('/', authMiddleware, upload.single('image'), createBlog); // Create blog
router.put('/:id', authMiddleware,upload.single('image'), updateBlog);   // Update blog
router.delete('/:id', authMiddleware, deleteBlog);// Delete blog
router.put('/:id/like', authMiddleware, toggleLikeBlog); // Like/Unlike blog
router.post('/:blogId/comments', authMiddleware, addComment); // Add comment to blog

module.exports = router;

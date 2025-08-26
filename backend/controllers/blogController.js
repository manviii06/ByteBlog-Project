const Blog = require('../models/Blog');
const path = require('path');

/**
 * CREATE BLOG
 * Handles file upload (multer will attach req.file if image is uploaded)
 */
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // if file was uploaded, save its path
    const imageURL = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.create({
      title,
      content,
      category,
      imageURL,
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error('Create Blog Error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL BLOGS (sorted by newest first)
 */
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET BLOG BY ID
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username profilePicture').populate("comments.user", "username profilePicture");
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: 'Blog not found' });
  }
};

/**
 * UPDATE BLOG
 */
// Helper to get blog author ID as string
// Helper to get blog author ID as string
const getAuthorId = (blog) => {
  if (!blog.author) return null;
  return blog.author._id ? blog.author._id.toString() : blog.author.toString();
};

// DELETE BLOG
// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only author can delete
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ message: err.message });
  }
};


// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const authorId = getAuthorId(blog);

    if (authorId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content, category } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    // Update image if new file uploaded
    if (req.file) {
      blog.imageURL = `/uploads/${req.file.filename}`;
    }

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: err.message });
  }
};





/**
 * LIKE / UNLIKE BLOG
 */
exports.toggleLikeBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.user._id.toString();
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter((uid) => uid.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      liked: !alreadyLiked,
      totalLikes: blog.likes.length,
      message: alreadyLiked ? 'Blog unliked' : 'Blog liked',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * GET ALL BLOGS (no sort, for admin maybe)
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username profilePicture');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET SINGLE BLOG
 */
exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author', 'username profilePicture');
    if (!blog) return res.status(404).json({ message: 'Blog not found' }).populate("comments.user", "username profilePicture");
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const newComment = {
      user: req.user._id,
      text,
    };

    blog.comments.push(newComment);
    await blog.save();

    // populate user info so frontend gets it
    await blog.populate("comments.user", "username profilePicture");

    res.status(201).json(blog.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


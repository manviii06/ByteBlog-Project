const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, content, category, imageURL } = req.body;
  try {
    const blog = await Blog.create({ title, content, category, imageURL, author: req.user._id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: 'Blog not found' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    Object.assign(blog, req.body);
    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleLikeBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.user._id.toString();
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(uid => uid.toString() !== userId);
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

const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { text } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = await Comment.create({
      user: req.user._id,
      blog: blogId,
      text,
    });

    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

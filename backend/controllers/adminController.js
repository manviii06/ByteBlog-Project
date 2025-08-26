const User = require('../models/User');
const Blog = require('../models/Blog');

const getAdminInsights = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const totalComments = await Blog.aggregate([
      { $unwind: "$comments" },
      { $count: "totalComments" },
    ]);

    // Top 5 blogs by likes
    const mostLikedBlogs = await Blog.find({})
      .sort({ likes: -1 }) // fixed: "likes.length" doesn't work
      .limit(5)
      .select("title likes author")
      .populate("author", "username email");

    // Top 5 active users by blog count
    const activeUsers = await Blog.aggregate([
      { $group: { _id: "$author", blogCount: { $sum: 1 } } },
      { $sort: { blogCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          username: "$user.username",
          email: "$user.email",
          blogCount: 1,
        },
      },
    ]);

    // Blogs created per day (last 7 days)
    const blogsPerDay = await Blog.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 7 },
    ]);

    // 🔹 New Additions for Better Admin Insights 🔹

    // Total likes across all blogs
    const totalLikes = await Blog.aggregate([
      { $project: { likesCount: { $size: "$likes" } } },
      { $group: { _id: null, totalLikes: { $sum: "$likesCount" } } },
    ]);

    // Most commented blogs
    const mostCommentedBlogs = await Blog.aggregate([
      { $project: { title: 1, commentsCount: { $size: "$comments" } } },
      { $sort: { commentsCount: -1 } },
      { $limit: 5 },
    ]);

    // Category breakdown (Pie Chart Data)
    const categoryBreakdown = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Users registered per month (last 6 months)
    const usersPerMonth = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: 6 },
    ]);

    res.json({
      // Existing
      totalUsers,
      totalBlogs,
      totalComments: totalComments[0]?.totalComments || 0,
      mostLikedBlogs,
      activeUsers,
      blogsPerDay,

      // Added
      totalLikes: totalLikes[0]?.totalLikes || 0,
      mostCommentedBlogs,
      categoryBreakdown,
      usersPerMonth,
    });
  } catch (error) {
    console.error("Admin Insights Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getRecentBlogs = async (req, res) => {
  try {
    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5)
      .populate('author', 'name email'); // Optional: include author details

    res.status(200).json({
      message: 'Recent blogs fetched successfully',
      blogs: recentBlogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent blogs', error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password') // hide password
      .sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single user by ID along with their blogs
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const blogs = await Blog.find({ author: user._id }).select('title category createdAt likes comments');

    res.status(200).json({ user, blogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAdminInsights, getRecentBlogs, getAllUsers, getUserById };

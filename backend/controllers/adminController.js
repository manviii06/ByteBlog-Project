const User = require('../models/User');
const Blog = require('../models/Blog');

const getAdminInsights = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const totalComments = await Blog.aggregate([
      { $unwind: '$comments' },
      { $count: 'totalComments' }
    ]);

    const mostLikedBlogs = await Blog.find({})
      .sort({ 'likes.length': -1 })
      .limit(5)
      .select('title likes author')
      .populate('author', 'name');

    const activeUsers = await Blog.aggregate([
      { $group: { _id: '$author', blogCount: { $sum: 1 } } },
      { $sort: { blogCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          name: '$user.name',
          email: '$user.email',
          blogCount: 1
        }
      }
    ]);

    const blogsPerDay = await Blog.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 7 }
    ]);

    res.json({
      totalUsers,
      totalBlogs,
      totalComments: totalComments[0]?.totalComments || 0,
      mostLikedBlogs,
      activeUsers,
      blogsPerDay
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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

module.exports = { getAdminInsights, getRecentBlogs };

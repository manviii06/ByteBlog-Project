const Blog = require("../models/Blog");
const User = require("../models/User");
const Subscriber = require("../models/Subscriber");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// ---------------- Profile ----------------
exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

exports.updateProfile = async (req, res) => {
  const { firstName, lastName, username, email, bio, profilePicture } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    if (profilePicture) user.profilePicture = profilePicture;

    const updatedUser = await user.save();
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Subscribers ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mayur.ghule05@gmail.com",
    pass: "aocl tcgb rfju rpuw"
  }
});

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already subscribed" });

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    await transporter.sendMail({
      from: "mayur.ghule05@gmail.com",
      to: email,
      subject: "Subscription Confirmation – Never Miss a Blog!",
      html: `<h2>Thank you for subscribing! 🎉</h2>
             <p>You will now receive the latest blogs, new tech updates, and exclusive news right in your inbox.</p>
             <p>– The Blog Team</p>`
    });

    res.status(201).json({ message: "Subscribed successfully and confirmation email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------- User Dashboard ----------------
exports.getUserDashboard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Fetch all user's blogs
    const posts = await Blog.find({ author: userId }).populate("comments.user", "username profilePicture");

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalComments = posts.reduce((sum, p) => sum + (p.comments.length || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes.length || 0), 0);

    // Views over time (last 7 days example)
    const viewsData = await Blog.aggregate([
      { $match: { author: userId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          views: { $sum: "$views" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ---------------- Top Posts ----------------
    const topPosts = posts
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map((p) => ({
        _id: p._id,
        title: p.title,
        views: p.views,
        author: p.author.username
      }));

    // ---------------- Recent Blogs ----------------
    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // ---------------- Device Dummy Data ----------------
    const deviceData = [
      { name: "Desktop", value: Math.floor(totalViews * 0.6) },
      { name: "Mobile", value: Math.floor(totalViews * 0.3) },
      { name: "Tablet", value: Math.floor(totalViews * 0.1) }
    ];

    // ---------------- Engagement & Averages ----------------
    const avgViewsPerPost = totalPosts ? (totalViews / totalPosts).toFixed(2) : 0;
    const avgCommentsPerPost = totalPosts ? (totalComments / totalPosts).toFixed(2) : 0;
    const engagementRate = totalViews
      ? (((totalLikes + totalComments) / totalViews) * 100).toFixed(2) + "%"
      : "0%";

    // ---------------- Most Commented Posts ----------------
    const mostCommentedPosts = posts
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 3);

    // ---------------- Category Breakdown ----------------
    const categoryBreakdown = posts.reduce((acc, p) => {
      const cat = p.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    const categoryData = Object.entries(categoryBreakdown).map(([category, count]) => ({ category, count }));

    // ---------------- Response ----------------
    res.json({
      totalPosts,
      totalViews,
      totalComments,
      viewsData,
      recentBlogs,
      topPosts,           // <--- included top posts here
      deviceData,
      totalLikes,
      avgViewsPerPost,
      avgCommentsPerPost,
      engagementRate,
      mostCommentedPosts,
      categoryData
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


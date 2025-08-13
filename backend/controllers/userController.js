const Blog = require("../models/Blog");
const User = require("../models/User");
const Subscriber = require("../models/Subscriber");
const nodemailer = require("nodemailer");

exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mayur.ghule05@gmail.com",   
    pass: "aocl tcgb rfju rpuw"      
  }
});
exports.subscribe = async (req, res) =>{
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    const mailOptions = {
      from: "mayur.ghule05@gmail.com",
      to: email,
      subject: "Subscription Confirmation – Never Miss a Blog!",
      html: `
        <h2>Thank you for subscribing! 🎉</h2>
        <p>You will now receive the latest blogs, new tech updates, and exclusive news right in your inbox.</p>
        <p>– The Blog Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Subscribed successfully and confirmation email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

}

exports.getSubscriber = async (req, res) => {
   try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 }); // latest first
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    // Fetch all user's blogs
    const posts = await Blog.find({ author: userId })
      .populate("comments.user", "username");

    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalComments = posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);

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

    // Top 5 posts by views
    const topPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

    // Recent 5 blogs
    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Views by device (dummy — replace with real device tracking if available)
    const deviceData = [
      { name: "Desktop", value: Math.floor(totalViews * 0.6) },
      { name: "Mobile", value: Math.floor(totalViews * 0.3) },
      { name: "Tablet", value: Math.floor(totalViews * 0.1) }
    ];

    // -------- Added Extra Data --------
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
    const avgViewsPerPost = totalPosts ? (totalViews / totalPosts).toFixed(2) : 0;
    const avgCommentsPerPost = totalPosts ? (totalComments / totalPosts).toFixed(2) : 0;
    const engagementRate = totalViews
      ? (((totalLikes + totalComments) / totalViews) * 100).toFixed(2) + "%"
      : "0%";

    const mostCommentedPosts = [...posts]
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 3);

    const recentComments = await Comment.find({
      blog: { $in: posts.map((p) => p._id) }
    })
      .populate("user", "username")
      .populate("blog", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const categoryBreakdown = posts.reduce((acc, post) => {
      const category = post.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    const categoryData = Object.entries(categoryBreakdown).map(
      ([category, count]) => ({ category, count })
    );
    // -----------------------------------

    res.json({
      // Original data
      totalPosts,
      totalViews,
      totalComments,
      viewsData,
      recentBlogs,
      topPosts,
      deviceData,

      // Extra analytics
      totalLikes,
      avgViewsPerPost,
      avgCommentsPerPost,
      engagementRate,
      mostCommentedPosts,
      recentComments,
      categoryData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


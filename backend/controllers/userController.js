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
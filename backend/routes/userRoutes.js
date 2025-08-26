const express = require("express");
const router = express.Router();
const {getProfile, updateProfile, subscribe, getUserDashboard} = require("../controllers/userController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // save inside /uploads
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put("/profile", authMiddleware, updateProfile);

// ✅ Upload endpoint
router.post("/upload", authMiddleware, upload.single("profilePicture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ profilePicture: req.file.filename });
});
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/subscribe", subscribe);
router.get('/dashboard', authMiddleware, getUserDashboard);

module.exports = router;



const express = require("express");
const router = express.Router();
const {getProfile, updateProfile, subscribe} = require("../controllers/userController");
const {authMiddleware} = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/subscribe", subscribe);

module.exports = router;



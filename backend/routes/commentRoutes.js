const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addComment } = require('../controllers/commentController');

const router = express.Router();

router.post('/:blogId', authMiddleware, addComment);

module.exports = router;

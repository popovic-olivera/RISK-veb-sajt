const express = require("express");

const blogPostController = require("./blogPostController");

const router = express.Router();
router.get("/", blogPostController.getBlogPosts);

module.exports = router;
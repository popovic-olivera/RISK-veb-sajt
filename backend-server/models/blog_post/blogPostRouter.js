const express = require("express");

const blogPostController = require("./blogPostController");

const router = express.Router();
router.get("/", blogPostController.getBlogPosts);
router.post("/", blogPostController.createBlogPost);

module.exports = router;
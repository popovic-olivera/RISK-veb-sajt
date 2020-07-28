const express = require("express");

const blogPostController = require("./blogPostController");

const router = express.Router();
router.get("/", blogPostController.getBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post("/", blogPostController.createBlogPost);
router.put("/:id", blogPostController.updateBlogPost);
router.delete("/:id", blogPostController.deleteBlogPost);

module.exports = router;

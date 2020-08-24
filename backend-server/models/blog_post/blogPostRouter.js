const express = require("express");

const blogPostController = require("./blogPostController");

// TODO test unauthorized access
const router = express.Router();
router.get("/", blogPostController.getBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post("/", blogPostController.createBlogPost);
router.put("/:id", blogPostController.updateBlogPost);
router.delete("/:id", blogPostController.deleteBlogPost);

module.exports = router;

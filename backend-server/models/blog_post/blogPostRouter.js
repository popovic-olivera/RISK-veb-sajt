const jwt = require("express-jwt");
const express = require("express");

const blogPostController = require("./blogPostController");

const auth = jwt({
    secret: "MY_SECRET", // FIXME secret should not be within the source code
    algorithms: ['HS256'],
    userProperty: "authData"
});

// TODO test unauthorized access
const router = express.Router();
router.get("/", blogPostController.getBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post("/", auth, blogPostController.createBlogPost);
router.put("/:id", auth, blogPostController.updateBlogPost);
router.delete("/:id", auth, blogPostController.deleteBlogPost);

module.exports = router;

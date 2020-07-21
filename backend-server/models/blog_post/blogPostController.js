const mongoose = require("mongoose");
const BlogPost = require("./blogPost");

module.exports.getBlogPosts = async (req, res, next) => {
    try {
        const blogPosts = await BlogPost.find().exec();
        res.status(200).json(blogPosts);
    } catch (err) {
        next(err);
    }
}
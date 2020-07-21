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

// TODO validate the request
module.exports.createBlogPost = async (req, res, next) => {
    try {
        const newBlogPost = new BlogPost({
            title: req.body.title,
            author_id: req.body.author_id,
            date: req.body.date,
            header_image: req.body.header_image,
            url_id: req.body.url_id,
            content: req.body.content,
            tags: req.body.tags
        });
        newBlogPost.save();
        res.status(201).send();
    } catch (err) {
        next(err);
    }
}
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

module.exports.getBlogPostById = async (req, res, next) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).exec();
        if (blogPost) {
            res.status(200).json(blogPost);
        } else {
            res.status(404).send();
        }
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
            tags: req.body.tags,
            comments: req.body.comments
        });
        await newBlogPost.save();
        res.status(201).send();
    } catch (err) {
        next(err);
    }
}

module.exports.updateBlogPost = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id) || (req.body._id != null && req.params.id !== req.body._id)) {
            res.status(400).send();
        } else {
            const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false}).exec();
            if (blogPost) {
                res.status(200).send();
            } else {
                res.status(404).send();
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports.deleteBlogPost = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).send();
        } else {
            const blogPost = await BlogPost.findByIdAndRemove(req.params.id, {useFindAndModify: false}).exec();
            if (blogPost) {
                res.status(200).json(blogPost);
            } else {
                res.status(404).send();
            }
        }
    } catch (err) {
        next(err);
    }
}

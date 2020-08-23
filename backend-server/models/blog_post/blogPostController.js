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

module.exports.createBlogPost = async (req, res, next) => {
    try {
        const blogPost = new BlogPost(req.body);
        const error = await blogPost.validateSync();
        if (error) {
            res.status(400).json({
                message: `Fields [${Object.keys(error.errors)}] are not correct`
            });
        } else {
            await blogPost.save();
            res.status(201).json(blogPost);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.updateBlogPost = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                message: `Invalid id in path: '${req.params.id}'`
            });
            //If the body contains an id, it must match the id contained in the path parameter.
        } else if (req.body._id != null && req.params.id !== req.body._id) {
            res.status(400).json({
                message: `Path id (${req.params.id}) doesn't match object id (${req.body._id})`
            });
        } else {
            const blogPostFromPayload = new BlogPost(req.body);
            const error = blogPostFromPayload.validateSync();
            if (error) {
                res.status(400).json({
                    message: `Fields [${Object.keys(error.errors)}] are not correct`
                });
            } else {
                /* `blogPostFromPayload` cannot be simply saved to override the existing one, because it would still be
                    saved, even when such document didn't exist before. Instead, assumed existing blog post is being
                    updated by the id, and it is checked whether the document existed beforehand.
                */
                const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, blogPostFromPayload, {
                    useFindAndModify: false,
                    new: true
                }).exec();
                if (blogPost) {
                    res.status(200).json(blogPost);
                } else {
                    res.status(404).send();
                }
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

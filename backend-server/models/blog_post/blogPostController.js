const mongoose = require("mongoose");
const BlogPost = require("./blogPost");
const resizer = require("../../util/imageResizer")

module.exports.getBlogPosts = async (req, res, next) => {
    try {
        let blogPosts = await BlogPost.find().exec();
        // noinspection JSUnresolvedFunction
        blogPosts = await Promise.all(blogPosts.map((post) => post.expanded()));
        res.status(200).json(blogPosts);
    } catch (err) {
        next(err);
    }
}

module.exports.getBlogPostById = async (req, res, next) => {
    try {
        let blogPost;
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            // It is a valid ObjectId, try to search by id
            blogPost = await BlogPost.findById(req.params.id).exec();
        }
        if (!blogPost) {
            // Try searching by url-id instead
            blogPost = await BlogPost.findOne({url_id: req.params.id}).exec();

        }
        if (blogPost) {
            blogPost = await blogPost.expanded();
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
        if (!req.authData) {
            res.status(401).json({
                message: "You need to be authorized to POST a blog post"
            });
        } else {
            // For unknown reasons, front-end sends array as a comma-delimited string
            req.body.tags = req.body.tags.split(",");
            // Don't forward the date into the new BlogPost - current date will be applied automatically
            delete req.body.date;
            let blogPost = new BlogPost(req.body);
            // noinspection JSUnresolvedVariable
            blogPost.author_id = req.authData.id;
            const error = await blogPost.validateSync();
            if (error) {
                res.status(400).json({
                    message: `Fields [${Object.keys(error.errors)}] are not correct`
                });
            } else {
                blogPost.header_image = resizer.cropResize(req.body.header_image, 1920, 22, 9)
                blogPost.title = blogPost.title.trim();
                blogPost.url_id = blogPost.title.toLowerCase().replace(/\s/g, "-");
                const existing = await BlogPost.findOne({url_id: blogPost.url_id}).exec();
                if (existing) {
                    res.status(400).json({
                        message: "Blog post with a similar title already exists",
                        existing: existing._id
                    })
                } else {
                    await blogPost.save();
                    blogPost = await blogPost.expanded();
                    res.status(201).json(blogPost);
                }
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports.updateBlogPost = async (req, res, next) => {
    try {
        // noinspection JSUnresolvedVariable
        if (!req.authData.id) {
            res.status(401).json({
                message: "You need to be authorized to PUT a blog post"
            });
        } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
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
                let blogPost = await BlogPost.findByIdAndUpdate(req.params.id, blogPostFromPayload, {
                    useFindAndModify: false,
                    new: true
                }).exec();
                if (blogPost) {
                    blogPost = await blogPost.expanded();
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
        // noinspection JSUnresolvedVariable
        if (!req.authData.id) {
            res.status(401).json({
                message: "You need to be authorized to DELETE a blog post"
            });
        } else if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).send();
        } else {
            let blogPost = await BlogPost.findByIdAndRemove(req.params.id, {useFindAndModify: false}).exec();
            if (blogPost) {
                blogPost = await blogPost.expanded();
                res.status(200).json(blogPost);
            } else {
                res.status(404).send();
            }
        }
    } catch (err) {
        next(err);
    }
}

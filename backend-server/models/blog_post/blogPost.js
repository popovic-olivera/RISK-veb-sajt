const mongoose = require("mongoose")

const blogPostSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    title: String,
    author_id: mongoose.Schema.Types.ObjectId,
    date: {type: Date, default: Date.now()},
    header_image: String,
    url_id: String,
    content: String,
    tags: [String],
    comments: [{author_id: mongoose.Schema.Types.ObjectId, date: Date, content: String}]
});

const blogPostModel = mongoose.model("blogPosts", blogPostSchema);

module.exports = blogPostModel;

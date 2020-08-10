const mongoose = require("mongoose")

const blogPostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    author_image: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    header_image: {type: String, required: true},
    content: {type: String, required: true},

    url_id: String,
    tags: [String],
    comments: [{author_id: mongoose.Schema.Types.ObjectId, date: Date, content: String}]
});

const blogPostModel = mongoose.model("blogPosts", blogPostSchema);

module.exports = blogPostModel;

const mongoose = require("mongoose");
const User = require("../user/user")

const blogPostSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    author_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    date: {type: Date, default: Date.now(), required: true},
    header_image: {type: String, required: true},
    desc: {type: String, required: true},
    content: {type: String, required: true},

    url_id: {type: String, unique: true},
    tags: [String],
    comments: [{author_id: mongoose.Schema.Types.ObjectId, date: Date, content: String}]
});

// TODO whether syntetic properties appear in both blog post and its comments
blogPostSchema.methods.expanded = async function () {
    const author = await User.findById(this.author_id).exec();

    const thisJson = this.toJSON();

    if (author) {
        thisJson.author_image = author.profilePictureUrl;
        thisJson.author_first_name = author.firstName;
        thisJson.author_last_name = author.lastName;
    }

    thisJson.comments = Promise.all(thisJson.comments.map(async comment => {
        const comment_author = await User.findById(comment.author_id).exec();
        if (comment_author) {
            comment.author_image = comment_author.profilePictureUrl;
            comment.author_first_name = comment_author.firstName;
            comment.author_last_name = comment_author.lastName;
        }
    }));

    return thisJson;
}

const blogPostModel = mongoose.model("blogPosts", blogPostSchema);

module.exports = blogPostModel;

const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    authorName: {type: String, required: true},
    authorID: {type: String},
    authorImage: {type: String},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    tags: [String],

    posterUrl: {type: String},
    presentationUrl: {type: String},

    githubRepoUrl: {type: String},
    videoUrl: {type: String},
    surveyUrl: {type: String},
});

const meetingsModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingsModel;

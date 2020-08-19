const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author_id: {type: mongoose.Schema.Types.ObjectId},
    date: {type: Date, default: Date.now()},
    description: {type: String, required: true},

    posterUrl: {type: String},
    githubRepoUrl: {type: String},
    presentationUrl: {type: String},
    photosUrl: {type: String},
    videoUrl: {type: String},
    surveyUrl: {type: String},

    tags: [String],
    comments: [{author_id: mongoose.Schema.Types.ObjectId, date: Date, content: String}]
});

const meetingsModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingsModel;

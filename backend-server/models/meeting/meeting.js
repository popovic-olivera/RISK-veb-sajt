const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author_name: {type: String, required: true},
    author_id: {type: String},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    tags: [String],

    posterUrl: {type: String},
    githubRepoUrl: {type: String},
    presentationUrl: {type: String},
    videoUrl: {type: String},
    surveyUrl: {type: String},
});

const meetingsModel = mongoose.model('meetings', meetingSchema);

module.exports = meetingsModel;

const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    resetToken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: '30m' }
});

module.exports = mongoose.model('passwordResetToken', resetTokenSchema);
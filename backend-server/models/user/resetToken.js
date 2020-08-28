const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resetToken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: '30m' }
});

module.exports = mongoose.model('passwordResetToken', resetTokenSchema);
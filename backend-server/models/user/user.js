const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    administrator: {type: Boolean, default: false},

    // TODO separate into "thumbnail" and "full_res" variants
    profilePictureUrl: String,

    postsNum: {type: Number, default: 0},
    followers: {type: [String]},
    following: {type: [String]},

    // TODO remove these fields from HTTP responses
    passwordHash: String,
    passwordSalt: String
});

userSchema.methods.setPassword = function (password) {
    this.passwordSalt = crypto.randomBytes(16).toString("hex");
    this.passwordHash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
        .toString("hex");
    return hash === this.passwordHash;
};

userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    const expiryDate = parseInt((expiry.getTime() / 1000).toString(), 10);
    // noinspection JSUnresolvedVariable
    const payload = {
        "id": this._id,
        "exp": expiryDate,
    };

    return jwt.sign(
        payload,
        "MY_SECRET", // FIXME secret should not be within the source code
        {algorithm: "HS256"});
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

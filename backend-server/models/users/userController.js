const User = require("./user");
const File = require("../file/file");
const mongoose = require("mongoose");
const fs = require("fs");

module.exports.getProfileById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                message: "Invalid user id"
            });
        } else if (req.authData && req.authData.id === req.params.id) {
            // Logged-in user is requesting his own profile
            const user = await User.findById(req.params.id).exec();
            if (!user) {
                res.status(404).send();
            } else {
                res.status(200).json(user);
            }
        } else {
            // Profile not requested by its' user — return public information only
            // TODO restrict data to fields which are public
            const user = await User.findById(req.params.id).exec();
            if (!user) {
                res.status(404).send();
            } else {
                res.status(200).json(user);
            }
        }
    } catch (err) {
        next(err);
    }
}

// TODO add email verification, both on profile creation, and when the user wants to change their email.
module.exports.register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const error = user.validateSync();

        if (error) {
            res.status(400).json({
                message: `Fields [${Object.keys(error.errors)}] are not correct`
            });
        } else {
            if (req.files && req.files['profilePicture']) {
                const profilePictureFile = await File.fromRequestFile(req.files['profilePicture'], 'public/profileImages');
                user.profilePictureUrl = profilePictureFile.path(true);
            }

            if (!req.body.password) {
                res.status(400).json({
                    message: "Missing 'password' field."
                });
            } else {
                user.setPassword(req.body.password);

                await user.save();

                const token = user.generateJwt();
                res.status(200).json({token});
            }
        }
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            res.status(400).json({
                message: "Missing 'email' parameter"
            });
        } else {
            if (!password) {
                res.status(400).json({
                    message: "Missing 'password' parameter"
                });
            } else {
                const user = await User.findOne({email: email}).exec();

                if (!user || !user.validPassword(password)) {
                    res.status(400).json({
                        message: "Wrong username or password"
                    });
                } else {
                    res.status(200).json({
                        token: user.generateJwt()
                    });
                }
            }
        }
    } catch (err) {
        next(err);
    }
};

module.exports.updateFollowers = async (req, res, next) => {
    try {
        const followedUserId = req.params.id;
        const currentUserId = req.body.currentUserId;

        if (!currentUserId) {
            res.status(400).json({
                message: "Missing 'currentUserId' parameter"
            });
        }

        // check if already following
        const user = await User.findOne({
            _id: currentUserId,
            following: {$elemMatch: {$eq: followedUserId}}
        }).exec();

        if (user) {
            res.status(404).json({
                message: `Already following user ${followedUserId}`
            });
            return;
        }

        // update followers
        const followedUser = User.findOneAndUpdate(
            {_id: followedUserId},
            {$push: {followers: currentUserId}}).exec();

        if (!followedUser) {
            res.status(404).json({
                message: `No user with id ${followedUserId}`
            });
            return;
        }

        // update current user following
        const currentUser = User.findOneAndUpdate(
            {_id: currentUserId},
            {$push: {following: followedUserId}}).exec();

        if (!currentUser) {
            res.status(404).json({
                message: `No user with id ${currentUserId}`
            });
            return;
        }

        res.status(200).send();

    } catch (err) {
        next(err);
    }
}

module.exports.updateProfile = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                message: "Invalid id"
            });
        } else if (req.body._id !== req.params.id) {
            res.status(400).json({
                message: "id in the path parameter doesn't match the id in the body"
            });
        } else {
            const userFromPayload = new User(req.body);
            const error = userFromPayload.validateSync();

            if (error) {
                res.status(400).json({
                    message: `Fields [${Object.keys(error.errors)}] are not correct`
                });
            } else {
                if (req.files && req.files['profilePicture']) {
                    const profilePictureFile = await File.fromRequestFile(req.files['profilePicture'], 'public/profileImages');

                    // delete old image
                    if (userFromPayload.profilePictureUrl) {
                        const oldUrl = new URL(userFromPayload.profilePictureUrl);

                        const pathParts = oldUrl.pathname.split("/");
                        const fileSystemPath = pathParts.slice(2).join("/");
                        const filename = pathParts.pop();

                        const filenameTokens = filename.split(".");

                        let id, type;
                        [id, type] = filenameTokens;

                        await File.deleteOne({_id: id, type: type}).exec();
                        fs.unlinkSync(fileSystemPath);
                    }
                    
                    // save new image url
                    userFromPayload.profilePictureUrl = profilePictureFile.path(true);
                }

                const user = await User.findByIdAndUpdate(req.params.id, userFromPayload, {
                  new: true
                }).exec();

                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({
                        message: `No user with id ${req.params.id}`
                    });
                }
            }
        }
    } catch (err) {
        next(err);
    }
}
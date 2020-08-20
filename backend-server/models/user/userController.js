const User = require("./user");
const File = require("../file/file");
const UnauthorizedError = require("express-jwt/lib/errors/UnauthorizedError");

// TODO add validation (also edit the User model so that User::validateSync could be used)
module.exports.register = async (req, res, next) => {
    try {
        let profilePictureUrl = undefined;
        if (req.files && req.files['profilePicture']) {
            const profilePictureFile = await File.fromRequestFile(req.files['profilePicture']);
            profilePictureUrl = profilePictureFile.path();
        }

        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profilePictureUrl: profilePictureUrl
        });

        user.setPassword(req.body.password);

        await user.save();

        const token = user.generateJwt();
        res.status(200).json({token});
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

module.exports.getProfile = async (req, res, next) => {
    try {
        if (!req.payload._id) {
            next(new UnauthorizedError())
        } else {
            const user = await User.findById(req.payload._id).exec();
            res.status(200).json(user);
        }
    } catch (err) {
        next(err);
    }
};



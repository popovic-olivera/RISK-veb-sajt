const User = require("./user");
const File = require("../file/file");
const UnauthorizedError = require("express-jwt/lib/errors/UnauthorizedError");

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
                const profilePictureFile = await File.fromRequestFile(req.files['profilePicture']);
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



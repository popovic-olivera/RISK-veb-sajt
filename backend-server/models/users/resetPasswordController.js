const User = require("./user");
const PasswordResetToken = require("./resetToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

module.exports.resetPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            return res.status(500).json({
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(409).json({
                message: 'Email does not exist'
            });
        }

        const resetToken = new PasswordResetToken({
            _id: user._id,
            resetToken: crypto.randomBytes(16).toString('hex')
        });

        resetToken.save(err => {
            if (err) {
                return res.status(500).send({
                    msg: err.message
                });
            }
        });

        PasswordResetToken.find({
            _id: user._id,
            resetToken: { $ne: resetToken.resetToken }
        }).remove().exec();

        // TODO remove credentials
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'olivera.popovic97@gmail.com',
                pass: 'MATF1997'
            }
        });

        const mailOptions = {
            to: user.email,
            from: 'olivera.popovic97@gmail.com',
            subject: 'RISK obnova lozinke',
            text: 'Poštovani, \n' + 'Primili ste ovaj imejl iz razloga što ste Vi (ili neko drugi) zatražili oporavak i promenu lozinke Vašeg profila na platformi organizacije RISK.\n\n'
            + 'Molimo Vas da ispratite sledeći link da završite i potvrdite proces: \n\n' +
            'http://localhost:4200/promena-lozinke/' + resetToken.resetToken + '\n\n' +
            'Ako niste Vi zatražili ovu promenu, ignorišite ovaj imejl i Vaša lozinka će ostati nepromenjena. \n\n'
            + 'Srdačan pozdrav,\n' + 'RISK tim'
        };

        transporter.sendMail(mailOptions, (error, _) => {
            if (error) {
                res.status(500).json({
                    message: 'Email was not sent'
                });

                return console.log(error);
            }
            else {
                res.status(200).json({
                    message: 'Email sent successfully'
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports.validPasswordToken = async (req, res, next) => {
    try {
        if (!req.params.resetToken) {
            return res.status(500).json({
                message: 'Token is required'
            });
        }

        const user = await PasswordResetToken.findOne({
            resetToken: req.params.resetToken
        });

        if (!user) {
            return res.status(409).json({
                message: 'Invalid URL'
            });
        }

        User.findOne({
            _id: user._id
        }).then(() => {
            res.status(200).json({
                message: 'Token verified successfully.'
            });
        }).catch(err => {
            return res.status(500).send({
                msg: err.message
            });
        });

    } catch (err) {
        next(err);
    }
}

module.exports.newPassword = async (req, res, next) => {
    try {
        await PasswordResetToken.findOne({ resetToken: req.body.resetToken }, (err, userToken, next) => {
            if (!userToken) {
                return res.status(409).json({
                    message: 'Token has expired'
                });
            }

            User.findOne({ _id: userToken._id }, (err, user, next) => {
                if (!user) {
                    return res.status(409).json({
                        message: 'User does not exist'
                    });
                }

                user.setPassword(req.body.newPassword);

                user.save();

                PasswordResetToken.deleteOne({
                    resetToken: userToken.resetToken
                }).exec();

                const token = user.generateJwt();
                res.status(200).json({token});
            });
        });
    } catch(err) {
        next(err);
    }
}

module.exports.changePassword = async (req, res, next) => {
    try {
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                message: "Invalid id"
            });
        } else if (!req.body.oldPassword || !req.body.newPassword) {
            res.status(400).json({
                message: "Missing old or new pasword"
            });
        } else {
            const user = await User.findById({_id: req.params.id}).exec();

            if (!user || !user.validPassword(req.body.oldPassword)) {
                res.status(400).json({
                    message: "Wrong username or password"
                });
            } else {
                user.setPassword(req.body.newPassword);
                
                await User.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    passwordSalt: user.passwordSalt,
                    passwordHash: user.passwordHash
                }).exec();

                res.status(200).send();
            }
        }
    } catch(err) {
        next(err);
    }
}

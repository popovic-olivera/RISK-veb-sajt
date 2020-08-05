const User = require("./user");

// TODO add error handling
module.exports.register = async (req, res) => {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePictureUrl: req.body.profilePictureUrl
    });

    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJwt();
    res.status(200);
    res.json({
        "token": token
    });
};

module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        res.status(400).json({
            message: "Missing 'email' parameter"
        });
    }

    if (!password) {
        res.status(400).json({
            message: "Missing 'password' parameter"
        });
    }

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
};

module.exports.getProfile = async (req, res) => {

    console.log(req.payload);

    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        const user = await User.findById(req.payload._id).exec();
        res.status(200).json(user);
    }
};



const User = require("./user");

module.exports.filter = async (req, res, next) => {
    try {
        const name = req.body.name;

        if (!name) {
            res.status(400).json({
                message: "Missing 'name' parameter"
            });
        }

        const words = name.split(" ");
        const filterFirstName = words[0];
        const filterLastName = words.slice(1).join(" ");
        let users = [];

        if (filterLastName) {
            users = await User.find({
                firstName: new RegExp('^'+filterFirstName, "i"),
                lastName: new RegExp('^'+filterLastName, "i")
            }).exec();
        } else {
            users = await User.find({
                firstName: new RegExp('^'+filterFirstName, "i")
            }).exec();
        }

        // maybe user entered last name first
        if (users.length === 0 && !filterLastName) {
            users = await User.find({
                lastName: new RegExp('^'+filterFirstName, "i")
            }).exec();
        }

        res.status(200).json(users);
    } catch(err) {
        next(err);
    }
}
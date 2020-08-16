const path = require("path");
const File = require("./file");

module.exports.getFileById = async function(req, res, next) {
    const filenameTokens = req.params.filename.split(".");
    if (filenameTokens.length !== 2) {
        res.status(400).json({
            message: "Bad file name"
        });
        next();
    }

    let id, type;
    [id, type] = filenameTokens;

    const file = await File.findOne({_id: id, type: type}).exec();

    if (!file) {
        res.status(404).send();
    } else {
        res.status(200).sendFile(path.resolve(file.path()));
    }
    next();
}

module.exports.uploadFile = async function(req, res, next) {
    if (!req.files) {
        res.status(400).send();
        next();
    }

    File.fromRequestFile(req.files.file, 'images')
        .then(value => {
            res.status(201).json(value);
            next();
        })
        .catch(reason => {
            console.log("Error storing file: " + reason);
            res.status(500).send();
            next(reason);
        });

}

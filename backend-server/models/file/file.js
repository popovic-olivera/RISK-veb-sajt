const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const fileSchema = new mongoose.Schema({
    size: {type: Number, required: true},
    type: {type: String, required: true},
    dateOfUpload: {type: Date, required: true, default: Date.now()},

    owner: mongoose.Schema.Types.ObjectId
});

fileSchema.methods.path = function (url = false) {
    const filepath = path.join("files", `${this._id.toString()}.${this.type}`);
    if (url) {
        return "http://localhost:4200/api/" + filepath;
    } else {
        return filepath;
    }
};

fileSchema.methods.store = async function (file) {

    // Check whether 'files' directory exists, because file::mv doesn't create directories by itself.
    if (!fs.existsSync("files")) {
        console.log("Directory 'files' doesn't exist.");
        const created = fs.mkdirSync("files");
        if (!created) {
            console.log("Error creating directory 'files'.");
        } else {
            console.log("Created directory 'files'.")
        }
    }

    const promise = new Promise((resolve, reject) => {
        file.mv(this.path(), err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    return promise;
}

fileSchema.statics.fromRequestFile = async function (requestFile, dir) {
    const file = new this({
        dir: dir,
        size: requestFile.size,
        type: requestFile.mimetype.split("/")[1]
    });

    const error = await file.validateSync();

    if (error) {
        throw error;
    }

    file.save();

    await file.store(requestFile);

    return file;
}

const fileModel = mongoose.model("files", fileSchema);

module.exports = fileModel;



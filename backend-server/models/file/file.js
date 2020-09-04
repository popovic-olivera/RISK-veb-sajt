const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const fileSchema = new mongoose.Schema({
    dir: {type: String, required: true},
    size: {type: Number, required: true},
    type: {type: String, required: true},
    dateOfUpload: {type: Date, required: true, default: Date.now()},
});

fileSchema.methods.path = function (url = false) {
    const filepath = path.join( this.dir, `${this._id.toString()}.${this.type}`);
    if (url) {
        return "http://localhost:4200/api/" + filepath;
    } else {
        return filepath;
    }
};

fileSchema.methods.store = async function (file) {

    // Check whether directory exists, because file::mv doesn't create directories by itself.
    if (!fs.existsSync(this.dir)) {
        console.log(`Directory ${this.dir} doesn't exist.`);
        fs.mkdirSync(this.dir);
        
        if (!fs.existsSync(this.dir)) {
            console.log(`Error creating directory ${this.dir}.`);
        } else {
            console.log(`Created directory ${this.dir}.`)
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



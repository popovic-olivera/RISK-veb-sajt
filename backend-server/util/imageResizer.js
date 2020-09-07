const Clipper = require("image-clipper");
const canvas = require("canvas");
const fs = require("fs");

/** Crop, resize and save an image.
 *
 * @param {string} source URL or Data URI of the source image
 * @param {string} filename filename prefix onto which the size suffix will be appended.
 * @param {'square'|'22:9'|undefined} shape if the image should be cropped, this is the ratio to which it should be cropped
 * @param sizes array of sizes to which the image should be resized, after cropping
 *
 * @return array of file paths of newly-saved files
 */
module.exports.cropResizeSave = function (source, filename, shape, sizes = [50, 500]) {
    Clipper(source, {canvas}, function () {
        const canvas = this.getCanvas();
        const width = canvas.width;
        const height = canvas.height;

        if (shape === "square") {
            if (width > height) {
                const x = (width - height) / 2;
                this.crop(x, 0, height, height);
            } else if (width < height) {
                const y = (height - width) / 2;
                this.crop(0, y, width, width);
            }
        } else if (shape === "22:9") {
            const ratio = width / height;
            if (ratio > 22 / 9) {
                const newWidth = height / 9 * 22;
                const x = (width - newWidth) / 2;
                this.crop(x, 0, newWidth, height);
            } else {
                const newHeight = width / 22 * 9;
                const y = (height - newHeight) / 2;
                this.crop(0, y, width, newHeight);
            }
        }

        // To ensure a descending order
        sizes.sort().reverse();

        const resultingFileNames = [];

        sizes.forEach(size => {
            this.resize(size)
                .toDataURL(function (dataUrl) {
                    // noinspection JSUnresolvedFunction
                    const type = dataUrl.split(":")[1].split(";")[0].split("/")[1];
                    // noinspection JSUnresolvedFunction
                    const encodedPart = dataUrl.split(";base64,")[1];
                    const path = `files/${filename}_${size}.${type}`;
                    resultingFileNames.push(path);
                    fs.writeFileSync(path, encodedPart, {encoding: "base64"});
                });
        })

        return resultingFileNames;
    });
}

const cn = require("canvas");

module.exports.cropResize = function (imageUrl, width, ratioWidth, ratioHeight) {
    const src = new cn.Image();
    src.src = imageUrl;

    let sx, sy, sw, sh;

    if (src.width / ratioWidth > src.height / ratioHeight) {
        // Image is too wide
        sh = src.height;
        sw = sh / ratioHeight * ratioWidth;
        sy = 0;
        sx = (src.width - sw) / 2;
    } else if (src.width / ratioWidth < src.height / ratioHeight) {
        // Image is too tall
        sw = src.width;
        sh = sw / ratioWidth * ratioHeight;
        sx = 0;
        sy = (src.height - sh) / 2;
    }

    const dest = new cn.Canvas(width, width / ratioWidth * ratioHeight);
    const context = dest.getContext("2d");
    context.drawImage(src,
        sx, sy, sw, sh,
        0, 0, dest.width, dest.height);

    return dest.toDataURL();
}

const path = require('path');
const fs = require('fs');


module.exports.getMeetingImages = async (req, res, next) => {
    try {
      const rootDir = path.dirname(require.main.filename);
      const imagesDir = path.join(rootDir, 'public/images/meetings');
      const images = fs.readdirSync(imagesDir);

      const imageArray = [];

      images.forEach(image => imageArray.push({
        "imageName": image,
        "imageUrl": 'http://localhost:3000/images/meetings/' + image
      }));

      res.status(200).json(imageArray);
    } catch (err) {
      next(err);
    }
}

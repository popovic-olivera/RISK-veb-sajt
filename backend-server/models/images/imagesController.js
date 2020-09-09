const path = require('path');
const fs = require('fs');

module.exports.getMeetingImages = async (req, res, next) => {
    try {
      const rootDir = path.dirname(require.main.filename);
      const imagesDir = path.join(rootDir, 'public/meetings');

      const imageArray = [];

      if (fs.existsSync(imagesDir)) {
        const images = shuffle(fs.readdirSync(imagesDir));

        images.forEach(image => imageArray.push({
          "imageName": image,
          "imageUrl": 'http://localhost:4200/api/public/meetings/' + image
        }));

        res.status(200).json(imageArray);
      }
    } catch (err) {
      next(err);
    }
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);

        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }

    return array;
}

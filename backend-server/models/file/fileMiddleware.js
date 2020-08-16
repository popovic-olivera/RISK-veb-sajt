const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

module.exports = function (req, res, next) {
    if (req.files && Object.keys(req.files).length !== 0) {
        for (let key in req.files) {
            if (req.files.hasOwnProperty(key)) {
                const file = req.files[key];
                if (file.size > MAX_FILE_SIZE) {
                    return res.status(400).json({
                        message: `File size too big, max allowed is ${MAX_FILE_SIZE_MB}MB`
                    });
                }
            }
        }
    }
    next();
};

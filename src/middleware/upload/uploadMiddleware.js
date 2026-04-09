const multer = require('multer');
const ApiError = require('../../utils/apierror/apiError');
const { resolveStrategy } = require('../../utils/uploadimg/strategies/uploadStrategyResolver');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        try {
            resolveStrategy(file.mimetype);
            cb(null, true);
        } catch (err) {
            cb(new ApiError(err.message, 400), false);
        }
    }
});

module.exports = upload;
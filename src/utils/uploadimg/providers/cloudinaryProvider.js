const cloudinary = require('../../../config/imgCloud/cloudinary');

const upload = (fileBuffer, { folder, resourceType }) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        stream.end(fileBuffer);
    });
};

module.exports = { upload };
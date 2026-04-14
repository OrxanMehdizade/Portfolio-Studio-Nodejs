const cloudinary = require('../../../config/imgCloud/cloudinary');


const sanitizeFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9.\-_]/g, '')
        .replace(/-+/g, '-');
};

const upload = (fileBuffer, { folder, resourceType, format, originalname }) => {
    return new Promise((resolve, reject) => {

        const baseName = originalname
            ? require('path').basename(originalname, require('path').extname(originalname))
            : 'file';
        
        const sanitized = sanitizeFileName(baseName);
        const timestamp = Date.now();
        
        const uploadOptions = {
            folder,
            resource_type: resourceType,
            public_id: `${sanitized}_${timestamp}`,
        };

        if (format) {
            uploadOptions.format = format;
        }

        const stream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        
        stream.end(fileBuffer);
    });
};

module.exports = { upload };
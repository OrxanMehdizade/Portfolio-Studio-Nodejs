const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const sanitizeFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9.\-_]/g, '')
        .replace(/-+/g, '-');
};

const upload = async (fileBuffer, { folder, format, originalname }) => {
    const dir = path.join(UPLOAD_DIR, folder);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const ext = originalname
        ? path.extname(originalname)
        : format ? `.${format}` : '';

    const baseName = originalname
        ? path.basename(originalname, ext)
        : 'file';

    const sanitized = sanitizeFileName(baseName);
    const timestamp = Date.now();
    const fileName = `${sanitized}_${timestamp}${ext}`;
    const filePath = path.join(dir, fileName);

    fs.writeFileSync(filePath, fileBuffer);

    return { url: `/uploads/${folder}/${fileName}`, publicId: fileName };
};

module.exports = { upload };
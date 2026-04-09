const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const upload = async (fileBuffer, { folder }) => {
    const dir = path.join(UPLOAD_DIR, folder);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const ext = path.extname(originalname) || '';
    const fileName = randomUUID() + ext;
    const filePath = path.join(dir, fileName);

    fs.writeFileSync(filePath, fileBuffer);

    const url = `/uploads/${folder}/${fileName}`;

    return { url, publicId: fileName };
};

module.exports = { upload };
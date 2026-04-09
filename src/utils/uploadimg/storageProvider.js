

const getStorageProvider = () => {
    const provider = process.env.STORAGE_PROVIDER;

    switch (provider) {
        case 'cloudinary':
            return require('./providers/cloudinaryProvider');
        case 'local':
            return require('./providers/localProvider');
        default:
            throw new Error(`Unknown storage provider: "${provider}". Check STORAGE_PROVIDER in .env`);
    }
};

module.exports = getStorageProvider;
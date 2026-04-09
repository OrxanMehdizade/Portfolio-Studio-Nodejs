const { resolveStrategy } = require('./strategies/uploadStrategyResolver');
const getStorageProvider = require('./storageProvider');
const ApiError = require('../apierror/apiError');


const uploadFile = async (fileBuffer, mimeType, tenantId = 'default') => {
    const strategy = resolveStrategy(mimeType);

    if (fileBuffer.length > strategy.maxSize) {
        throw new ApiError(
            `File too large. Max size: ${strategy.maxSize / 1024 / 1024}MB`,
            400
        );
    }

    const folder = strategy.getFolder(tenantId);
    const storageProvider = getStorageProvider();

    return storageProvider.upload(fileBuffer, {
        folder,
        resourceType: strategy.resourceType,
        mimeType
    });
};

module.exports = uploadFile;
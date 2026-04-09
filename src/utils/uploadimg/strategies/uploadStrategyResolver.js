const imageStrategy   = require('./imageStrategy');
const videoStrategy   = require('./videoStrategy');
const documentStrategy = require('./documentStrategy');

const strategies = [imageStrategy, videoStrategy, documentStrategy];

const resolveStrategy = (mimeType) => {
    const strategy = strategies.find(s => s.isAllowed(mimeType));
    if (!strategy) {
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
    return strategy;
};

module.exports = { resolveStrategy };
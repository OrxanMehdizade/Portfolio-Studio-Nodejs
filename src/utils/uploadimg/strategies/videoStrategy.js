const ALLOWED_MIMES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const MAX_SIZE = 100 * 1024 * 1024; 

const videoStrategy = {
    resourceType: 'video',
    maxSize: MAX_SIZE,
    isAllowed: (mime) => ALLOWED_MIMES.includes(mime),
    getFolder: (tenantId) => `${tenantId}/videos`
};

module.exports = videoStrategy;
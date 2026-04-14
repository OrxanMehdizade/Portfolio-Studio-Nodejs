const ALLOWED_MIMES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const MAX_SIZE = 100 * 1024 * 1024;

const FORMAT_MAP = {
    'video/mp4':       'mp4',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',
    'video/webm':      'webm',
};

const videoStrategy = {
    resourceType: 'video',
    maxSize: MAX_SIZE,
    isAllowed: (mime) => ALLOWED_MIMES.includes(mime),
    getFolder:  (tenantId) => `${tenantId}/videos`,
    getFormat:  (mime) => FORMAT_MAP[mime] || null,
};

module.exports = videoStrategy;
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 20 * 1024 * 1024; 

const imageStrategy = {
    resourceType: 'image',
    maxSize: MAX_SIZE,
    isAllowed: (mime) => ALLOWED_MIMES.includes(mime),
    getFolder: (tenantId) => `${tenantId}/images`
};

module.exports = imageStrategy;
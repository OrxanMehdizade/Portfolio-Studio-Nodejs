const ALLOWED_MIMES = [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const MAX_SIZE = 20 * 1024 * 1024;

const documentStrategy = {
    resourceType: 'raw',
    maxSize: MAX_SIZE,
    isAllowed: (mime) => ALLOWED_MIMES.includes(mime),
    getFolder: (tenantId) => `${tenantId}/documents`
};

module.exports = documentStrategy;
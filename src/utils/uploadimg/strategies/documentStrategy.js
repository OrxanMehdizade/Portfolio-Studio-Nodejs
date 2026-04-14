const ALLOWED_MIMES = [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_SIZE = 20 * 1024 * 1024;

const FORMAT_MAP = {
    'application/pdf':   'pdf',
    'text/plain':        'txt',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

const documentStrategy = {
    resourceType: 'raw',
    maxSize: MAX_SIZE,
    isAllowed: (mime) => ALLOWED_MIMES.includes(mime),
    getFolder:  (tenantId) => `${tenantId}/documents`,
    getFormat:  (mime) => FORMAT_MAP[mime] || null,
};

module.exports = documentStrategy;
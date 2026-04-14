const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

const rootDir = process.cwd();
const logDir = path.join(rootDir, 'src', 'logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        })
    ]
});

module.exports = logger;
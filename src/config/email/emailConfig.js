

const getEmailProvider = () => {
    const provider = process.env.EMAIL_PROVIDER;

    if (!provider) {
        throw new Error('EMAIL_PROVIDER is not set in .env');
    }

    switch (provider) {
        case 'resend': {
            const { Resend } = require('resend');

            if (!process.env.RESEND_API_KEY) {
                throw new Error('RESEND_API_KEY is not set in .env');
            }

            return new Resend(process.env.RESEND_API_KEY);
        }
        default:
            throw new Error(`Unknown email provider: "${provider}"`);
    }
};

module.exports = getEmailProvider;
const getEmailProvider = () => {
    const provider = process.env.EMAIL_PROVIDER;

    switch (provider) {
        case 'resend': {
            const { Resend } = require('resend');
            return new Resend(process.env.RESEND_API_KEY);
        }
        default:
            throw new Error(`Unknown email provider: ${provider}`);
    }
};

module.exports = getEmailProvider();


const getProvider = () => {
    const provider = process.env.EMAIL_PROVIDER;

    switch (provider) {
        case 'resend':
            return require('./providers/resendProvider');
        default:
            throw new Error(`Unknown email provider: ${provider}`);
    }
};


const sendEmail = async ({ to, subject, html, replyTo }) => {
    const provider = getProvider();
    await provider({ to, subject, html, replyTo });
};

module.exports = sendEmail;
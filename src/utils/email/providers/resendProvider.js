const getEmailProvider = require('../../../config/email/emailConfig');

const resendProvider = async ({ to, subject, html, replyTo }) => {
    const client = getEmailProvider();
    await client.emails.send({
        from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
        ...(replyTo && { reply_to: replyTo })
    });
};

module.exports = resendProvider;
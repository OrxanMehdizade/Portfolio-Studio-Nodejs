const client = require('../../../config/email/emailConfig');

const resendProvider = async ({ to, subject, html, replyTo }) => {
    await client.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to,
        subject,
        html,
        ...(replyTo && { reply_to: replyTo })
    });
};

module.exports = resendProvider;
import nodemailer from 'nodemailer';

// Create a test account using Ethereal for development
const createTransporter = async () => {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

export const sendOTPEmail = async (email, otp) => {
    try {
        const transporter = await createTransporter();

        const info = await transporter.sendMail({
            from: '"Todo App" <noreply@todoapp.com>',
            to: email,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`,
            html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p><p>This OTP will expire in 10 minutes.</p>`,
        });

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
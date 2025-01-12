const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Temporary OTP storage
const otps = {};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // Your email
        pass: 'your_email_password', // Your email password or app password
    },
});

// Controller for sending OTP
exports.sendOtp = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    otps[email] = otp;

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send OTP', error });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    });
};

// Controller for verifying OTP
exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // OTP verified, remove it from storage
        res.status(200).json({ verified: true });
    } else {
        res.status(400).json({ verified: false, message: 'Invalid OTP' });
    }
};

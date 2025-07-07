const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require("../models/User");
const OTPToken = require('../models/OTPToken');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("🔔 Incoming register request:", req.body);

        const newUser = new User({ name, email, password }); // No need to hash manually
        const savedUser = await newUser.save();

        console.log("✅ User saved:", savedUser);

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("❌ Registration error:", err);
        res.status(500).json({ message: "Registration failed." });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid auth.' });

        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        if (!email) return res.status(400).json({ message: "Email is required" });

        // Clear previous OTPs
        await OTPToken.deleteMany({ email });

        // Save new OTP
        await OTPToken.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // expires in 5 minutes
        });

        // Set up transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,      // smtp.gmail.com
            port: process.env.EMAIL_PORT,      // 587
            secure: false,                     // use TLS (STARTTLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`
        });


        console.log(`✅ OTP ${otp} sent to ${email}`);
        res.json({ message: 'OTP sent to email.' });
    } catch (err) {
        console.error('❌ Failed to send OTP:', err.message, err);
        res.status(500).json({ message: 'Could not send OTP.', error: err.message });
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const validToken = await OTPToken.findOne({ email, otp });
        if (!validToken)
            return res.status(400).json({ message: 'Invalid or expired OTP.' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        await OTPToken.deleteMany({ email });

        res.json({ message: 'Password reset successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;

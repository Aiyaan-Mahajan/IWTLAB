const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const User = require('./models/User');
const OTPToken = require('./models/OTPToken');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/wemarket_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,      
  port: process.env.EMAIL_PORT,    
  secure: false,                   
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!name || !email || !message)
      return res.status(400).json({ message: 'All fields required' });

    return res.status(200).json({ message: 'Message received!' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Signup error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
});

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    await OTPToken.deleteMany({ email });
    const token = new OTPToken({ email, otp });
    await token.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    });

    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const token = await OTPToken.findOne({ email, otp });
    if (!token) return res.status(400).json({ message: 'Invalid OTP' });

    await User.findOneAndUpdate({ email }, { password: newPassword });
    await OTPToken.deleteMany({ email });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

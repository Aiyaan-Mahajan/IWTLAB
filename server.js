// server.js
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Contact = require('./models/contact');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB (local database "wemarketdb")
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wemarketdb';
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());
app.use(express.static('public'));
// serve static files from /public

const cors = require('cors');
app.use(cors());

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {


    console.log("Received request to /api/contact");

    console.log("Request body:", req.body);

    console.log("helllo");
    const { name, email, message } = req.body;
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Save contact data to MongoDB
    const newContact = new Contact({ name, email, message });
    console.log(newContact);
    await newContact.save();

    console.log("done till here");
    // Always respond with success (even if email failed)
    return res.json({ message: 'Contact form submitted successfully.' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

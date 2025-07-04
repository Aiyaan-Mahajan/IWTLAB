const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Contact = require('./models/contact');

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: 'All fields required.' });

    await new Contact({ name, email, message }).save();
    res.json({ message: 'Contact form submitted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

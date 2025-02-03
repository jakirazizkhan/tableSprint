const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.js');

dotenv.config();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const fakeCreds = async () => {
  try {
    const email = 'admin@example.com';
    const password = 'password'; 

    const user = new User({ email, password });
    await user.save();

    console.log('User saved:', user);
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    mongoose.disconnect().then(() => console.log('MongoDB disconnected'));
  }
};

fakeCreds();

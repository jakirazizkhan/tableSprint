// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { setCookie } = require('../config/jwtConfig'); // Import setCookie function
require('dotenv').config();

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        setCookie(res, token);  // Set token as a cookie
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

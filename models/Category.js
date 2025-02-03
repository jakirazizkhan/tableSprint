const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  image: {
    type: String, // URL or base64-encoded string for image
    default: null,
  },
});

module.exports = mongoose.model('Category', categorySchema);

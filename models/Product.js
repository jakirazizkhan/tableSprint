// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subCategory: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  image: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

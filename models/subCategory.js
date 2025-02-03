const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);

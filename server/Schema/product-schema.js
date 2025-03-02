const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number, // Corrected the typo here
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model("product", prodSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [
    {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      houseNo: {
        type: String,
        required: true,
      },
      roadName: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  ],
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

module.exports = mongoose.model("users", userSchema);

const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // rupees → paise
      currency: "INR",
      receipt: "receipt_001",
    });

    res.status(200).json(order);

  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
});

router.post("/verify-payment", (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment is genuine
      return res.status(200).json({ success: true });
    } else {
      // ❌ Tampered payment
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

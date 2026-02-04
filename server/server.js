// import dotenv from "dotenv";
// import Razorpay from "razorpay";
const dotenv = require("dotenv");
dotenv.config(); // MUST be at the top
const Razorpay = require("razorpay");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const regis_router = require("./Routes/login-routes");
const img_router = require("./Routes/image-routes");
const Adm_router = require("./Routes/Admin-route");
const reviewRouter = require("./Routes/review-route");
const ordersRouter = require("./Routes/orders-route");
const adminRoutes = require("./Routes/admin-routes");
const paymentRoute = require("./Routes/payment-route");
const userRoutes = require("./Routes/user-routes");
const cors = require("cors");


mongoose
  .connect(
    "mongodb+srv://Alex:alexbenedictselva1772006@cluster0.n2pci.mongodb.net/",
  )
  .then(console.log("Successfully connected to the dataBase"))
  .catch((e) => console.log("Error in connecting to the dataBase :", e));

app.use(express.json());
app.use(cors());
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
app.use("/api", regis_router);
app.use("/api/admin", img_router);
app.use("/api/admin", Adm_router);
app.use("/api/review", reviewRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/user", userRoutes);

const port = "5000";
app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});

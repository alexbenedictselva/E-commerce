const express = require("express");
const router = express.Router();
const {
  registerUser,
  UserLogin,
  DeleteAllRegisteredUsers,
  DisplayCart,
  AddToCart,
  ChangeQuanitity,
  DeleteProductFromCart,
  getTheTagProduct,
  getAllProducts,
  GetTheProduct
} = require("../Controller/login-controller");
const {
  AdminVerification,
  getFromToken,
} = require("../middleware/auth-middleware");

const { inserManyImages } = require("../Controller/images-controller");
// const {GetImgSales1} = require('../Controller/images-controller')

router.post("/register", registerUser);
router.post("/login", UserLogin);
router.get(
  "/deleteMany",
  getFromToken,
  AdminVerification,
  DeleteAllRegisteredUsers
);
router.post("/addProd", AdminVerification,);
// router.get('/cart', DisplayCart);

router.post("/insertMany", getFromToken, AdminVerification, inserManyImages);
// router.get('GetForSalesOne', GetImgSales1);

// router.post("/addToCart", AddToCart);
router.get('/cart',getFromToken, DisplayCart);
router.post('/alter',getFromToken, ChangeQuanitity);
router.post("/addToCart", getFromToken, AddToCart);
router.put("/deleteCart",getFromToken, DeleteProductFromCart);
router.get("/GetTag", getTheTagProduct);
router.get("/getAll", getAllProducts);
router.get("/getProd/:id", GetTheProduct);

module.exports = router;

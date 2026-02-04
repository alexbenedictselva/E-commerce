const express = require("express");
const router = express.Router();
const { addAddress, getUserAddresses } = require("../Controller/user-controller");
const { getFromToken } = require("../middleware/auth-middleware");

router.post("/addAddress", getFromToken, addAddress);
router.get("/addresses", getFromToken, getUserAddresses);

module.exports = router;
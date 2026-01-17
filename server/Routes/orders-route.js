const express = require('express');
const { getFromToken } = require('../middleware/auth-middleware');
const { PlaceOrder } = require('../Controller/orders-controller');
const router = express.Router();

router.post('/placeOrder',getFromToken,PlaceOrder)

module.exports = router;
const express = require("express");
const router = express.Router();
const {GetImgSales1,GetImgSales2} = require('../Controller/images-controller')

router.get('/GetForSalesOne', GetImgSales1);
router.get('/GetForSalesTwo', GetImgSales2);

module.exports = router;
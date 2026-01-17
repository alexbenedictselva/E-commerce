const ordersSchema = require("../Schema/orders-schema");

const mongoose = require("mongoose");

const PlaceOrder = async (req, res) => {
    try {
        const userId = req.userInfo;
        
        
  } catch (e) {
    console.log("Error in placing Order", e);
  }
};

module.exports = { PlaceOrder };

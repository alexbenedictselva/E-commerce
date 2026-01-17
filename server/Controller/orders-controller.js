const ordersSchema = require("../Schema/orders-schema");

const mongoose = require("mongoose");
const productSchema = require("../Schema/product-schema");

const PlaceOrder = async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.json({ message: "You should send some products" });
    }
    const productContent = [];
    let totalAmount = 0;
    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.json({ message: "Product id is not in the required type" });
      }
      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const getProd = await productSchema.findById(item.productId);
      if (!getProd) {
        return res.json({ message: "Product not found" });
      }

      totalAmount += getProd.price * item.quantity;
      productContent.push({
        productId: item.productId,
        orderPrice: getProd.price,
        orderName: getProd.product,
        orderQuantity: item.quantity,
      });
    }

    const order = await ordersSchema.create({
      userId: userId,
      products: productContent,
      totalAmount: totalAmount,
    });

    return res.json({
      message: "Ordered successfully",
      order: order,
    });
  } catch (e) {
    console.log("Error in placing Order", e);
  }
};

const UpdatePaymentStatus = async (orderId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new Error("Object id mismatch");
    }

    const updateTheOrder = await ordersSchema.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "paid",
      },
      { new: true },
    );

    if (!updateTheOrder) {
      throw new Error("Order Not found");
    }

    return updateTheOrder;
  } catch (e) {
    console.log("Error in updating payement status", e);
  }
};

module.exports = { PlaceOrder, UpdatePaymentStatus };

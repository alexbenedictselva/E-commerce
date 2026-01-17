const reviewSchema = require("../Schema/review-schema");
const productSchema = require("../Schema/product-schema");
const mongoose = require("mongoose");

const AddReview = async (req, res) => {
  try {
    const { userId } = req.userInfo;

    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.json({
        message: "All fields are required",
      });
    }

    if (!(rating >= 0 && rating <= 5)) {
      return res.json({ message: "rating should be inside 1 to 5" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.json({ message: "product id is not in the required format" });
    }
    const product = await productSchema.findById(productId);
    if (!product) {
      return res.json({ message: "product not found!" });
    }

    const review = await reviewSchema.create({
      userId,
      productId,
      rating,
      comment,
    });

    return res.json({
      message: "Review Created successfully",
      review: review,
    });
  } catch (e) {
    console.log("Error in adding review", e);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.json({ message: "object type defined is wrong" });
    }

    const reviews = await reviewSchema.find({ productId: productId });
    if (!reviews) {
      return res.json({ message: "No reviews found" });
    }

    return res.json({
      message: "Reviews retrived",
      reviews: reviews,
    });
  } catch (e) {
    console.log("Error in retriving the product's review", e);
  }
};

module.exports = { AddReview, getAllReviews };

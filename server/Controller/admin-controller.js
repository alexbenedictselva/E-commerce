const ProdSchema = require("../Schema/product-schema");

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, image, category, price, stock, tags } = req.body;
    const getProd = await ProdSchema.findById(id);
    if (!getProd) {
      return res.status(404).json({
        success: false,
        message: "there is no object with the given id"
      });
    }
    if (product !== undefined) getProd.product = product;
    if (image !== undefined) getProd.image = image;
    if (category !== undefined) getProd.category = category;
    if (price !== undefined) getProd.price = price;
    if (stock !== undefined) getProd.stock = stock;
    if (tags !== undefined) getProd.tags = tags;

    const updatedProd = await getProd.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProd
    });
  } catch (e) {
    console.log("Error in updating product : ",e);
  }
}

const DeleteProd = async (req, res) => {
  try {
    const { id } = req.params;
    const GetProd = await ProdSchema.findByIdAndDelete(id);
    if (GetProd) {
      res.json({
        success: true,
        message: "Item deleted successfully"
      });
    }
  } catch (e) {
    console.log("Error in deleting product :",e);
  }
}

const insertImages = async (req, res) => {
  try {
    const { product, image, category, price, stock, tags } = req.body;

    if (!product || !image) {
      return res.status(400).json({ success: false, message: "Product name and image URL are required" });
    }

    const newProd = new ProdSchema({
      product,
      image,
      category,
      price,
      stock,
      tags
    });

    await newProd.save();

    res.status(201).json({ success: true, product: newProd });
  } catch (err) {
    console.error("Error in adding product:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  UpdateProduct,
  DeleteProd,
  insertImages
};
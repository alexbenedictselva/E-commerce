const userSchema = require("../Schema/user-schema");
// require("../Schema/product-schema");
const ProdSchema = require("../Schema/product-schema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const registerUser = async (req, res) => {
  try {
    const { username, password, email, role, cart } = req.body;
    const findUser = await userSchema.findOne({ username: username });
    const findEmail = await userSchema.findOne({ email: email });
    if (findUser) {
      return res.status(404).json({
        success: false,
        message: "Username already exist",
        data: findUser,
      });
    }
    if (findEmail) {
      return res.status(404).json({
        success: false,
        message: "Email already registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
      role: role,
      cart,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "New user got created successfully",
      data: newUser,
    });
  } catch (e) {
    console.log("Error in regitering : ", e);
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Findemail = await userSchema.findOne({ email: email });
    if (!Findemail) {
      return res.status(404).json({
        success: false,
        message: `There is no email registered with ${email}`,
      });
    }
    const isPassMatches = await bcrypt.compare(password, Findemail.password);
    if (!isPassMatches) {
      return res.status(404).json({
        success: false,
        message: `Password dosen't matches for the email ${email}`,
      });
    }

    const accesstoken = jwt.sign(
      {
        userId: Findemail._id,
        username: Findemail.username,
        role: Findemail.role,
        cart: Findemail.cart,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    console.log(accesstoken);
    res.send({
      success: true,
      message: "Password matches user... logged in ",
      token: accesstoken,
      role: Findemail.role
    });
    console.log("TOKEN :", accesstoken);
  } catch (e) {
    console.log("Error in logging in : ", e);
  }
};

const DeleteAllRegisteredUsers = async (req, res) => {
  try {
    const DeleteAll = await userSchema.deleteMany({});
    if (!DeleteAll) {
      return res.json({
        success: false,
        message: "Can't able to delete",
      });
    }
    res.json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (e) {
    console.log("Error in deleting all users : ", e);
  }
};

const updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const GetEmail = await userSchema.findOne({ email: email });
  if (!GetEmail) {
    return res.json({
      success: false,
      message: "Email not found",
    });
  }
  const CheckPassword = await bcrypt.compare(oldPassword, GetEmail.password);
  if (!CheckPassword) {
    return res.json({
      success: false,
      message: "Old password is wrong",
    });
  }
  const UpdateTheAccount = await userSchema.findOneAndUpdate();
};

const DisplayCart = async (req, res) => {
  const { userId } = req.userInfo;
  try {
    // const userProd = await userSchema.findById("67828d4ff92fea0063569f73").populate(
    //   "cart.productId"
    // );
    const userProd = await userSchema
      .findById(userId)
      .populate("cart.productId");

    if (!userProd) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
      cart: userProd.cart,
    });
  } catch (e) {
    console.log("Error in displaying cart", e);
  }
};

const AddToCart = async (req, res) => {
  const prodId = req.body.id;
  //YET to uncommented since there is no tokent produced here we can't do futher
  const { userId } = req.userInfo;
  // console.log(userId);
  try {
    // const ADDToschema = await userSchema.findById("67828d4ff92fea0063569f73");
    const ADDToschema = await userSchema.findById(userId);
    if (!ADDToschema) {
      return res.json({
        success: false,
        message: "Can't find the user with that id",
      });
    }
    const cartItemExist = ADDToschema.cart.find((e) => {
      return e.productId.toString() === prodId;
    });
    if (cartItemExist) {
      return res.status(200).json({
        success: true,
        message: "Already added",
        data: ADDToschema,
      });
    } else {
      ADDToschema.cart.push({ productId: prodId });
    }
    await ADDToschema.save();
    res.json({
      success: true,
      message: "Successfully added to the cart",
      data: ADDToschema,
    });
    console.log(ADDToschema);
  } catch (e) {
    console.log("Error in adding to cart : ", e);
  }
};

const ChangeQuanitity = async (req, res) => {
  try {
    const { quantityProd, prodId } = req.body;
    const { userId } = req.userInfo;
    const GetUser = await userSchema.findById(userId);
    const items = (GetUser.cart.find(
      (e) => e._id.toString() === prodId.toString()
    ).quantity = quantityProd);
    await GetUser.save();
    res.json({
      success: true,
      message: GetUser.cart,
    });
  } catch (e) {
    console.log("Error in Changing quantity : ", e);
  }
};

const DeleteProductFromCart = async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const { prodId } = req.body;
    const delProd = await userSchema.findById(userId);
    if (!delProd) {
      res.json({
        success: false,
        message: "User not found",
      });
    }

    // delProd.cart.forEach((e) => {
    //   console.log(
    //     "e.productId:",
    //     e.productId.toString(),
    //     "prodId:",
    //     prodId.toString()
    //   );
    // });
    // const itemExists = delProd.cart.some(
    //   (e) => e.productId.toString() === prodId.toString()
    // );
    // if (!itemExists) {
    //   console.log("NOT FOUND");
    //   return res.json({
    //     success: false,
    //     message: "Product not found in cart",
    //   });
    // }
    // console.log("Cart items before filtering:", delProd.cart);
    delProd.cart = delProd.cart.filter((e) => {
      return e._id.toString() !== prodId.toString();
    });
    // console.log("HOI", delProd.cart);
    await delProd.save();
    if (delProd) {
      res.json({
        success: true,
        message: delProd,
      });
    }
  } catch (e) {
    console.log("Error from deleting product from cart : ", e);
  }
};

const getTheTagProduct = async (req, res) => {
  try {
    const { tag } = req.query;
    const GetProd = await ProdSchema.find({ tags: { $in: tag } });
    if (GetProd) {
      res.json({
        success: true,
        message: GetProd,
      });
    } else {
      res.json({
        success: false,
        message: "Can't find the products",
      });
    }
  } catch (e) {
    console.log("Error in retriving tag products : ", e);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAllProd = await ProdSchema.find({ tags: { $in: "default" } });
    if (getAllProd) {
      return res.json({
        success: true,
        message: getAllProd,
      });
    }
    res.json({
      success: false,
      message: "Error in fetching data ",
    });
  } catch (e) {
    console.log("Error in retriving all products : ", e);
  }
};

const GetTheProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid or missing product ID' });
    }
    const getProdDetails = await ProdSchema.findById(id);
    if (!getProdDetails) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: getProdDetails,
    });
  } catch (e) {
    console.log("Error in retriving the product : ", e);
  }
};

module.exports = {
  registerUser,
  UserLogin,
  DeleteAllRegisteredUsers,
  DisplayCart,
  AddToCart,
  ChangeQuanitity,
  DeleteProductFromCart,
  getTheTagProduct,
  getAllProducts,
  GetTheProduct,
};

const User = require("../Schema/user-schema");

const addAddress = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { name, phoneNumber, houseNo, roadName, pincode, city, state } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newAddress = {
      name,
      phoneNumber,
      houseNo,
      roadName,
      pincode,
      city,
      state,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.log("Error adding address:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error getting addresses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { addAddress, getUserAddresses };
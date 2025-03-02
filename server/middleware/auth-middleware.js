const jwt = require("jsonwebtoken");

const getFromToken = (req, res, next) => {
  const GetTokenDetails = req.headers["authorization"];
  if (!GetTokenDetails) {
    return res.json({
      success: false,
      message: "Token is not provided",
    });
  }
  const GetToken = GetTokenDetails.split(" ")[1];
  try {
    const decodedToken = jwt.verify(GetToken, "alexbenedictselva");
    if (!decodedToken) {
      return res.json({
        success: false,
        message: "Token is not present",
      });
    }
    req.userInfo = decodedToken;
    console.log(req.userInfo);
    next();
  } catch (e) {
    console.log("Error in fetching token : ", e);
  }
};
const AdminVerification = (req, res, next) => {
  try {
    if (req.userInfo.role !== "admin") {
      return res.json({
        success: false,
        message: "only admins can access this page",
      });
    }
    next();
  } catch (e) {
    console.log("Error in admin :", e);
  }
};

module.exports = { getFromToken, AdminVerification };

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
  const decoded = jwt.decode(GetToken);
  console.log(new Date(decoded.exp * 1000)); // Check expiry time

  try {
    const decodedToken = jwt.verify(GetToken, process.env.JWT_SECRET);
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
    console.log("Error in fetching token middleware: ", e);
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
    console.log("Error in admin middleware:", e);
  }
};

module.exports = { getFromToken, AdminVerification };

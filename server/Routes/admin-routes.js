const express = require("express");
const router = express.Router();
const { getAdminKPIs } = require("../Controller/adminAnalyticsController");
const {
  getFromToken,
  AdminVerification,
} = require("../middleware/auth-middleware");

router.get("/kpis", getFromToken, AdminVerification, getAdminKPIs);

module.exports = router;

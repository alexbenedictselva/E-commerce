const express = require("express");
const router = express.Router();
const upload = require("../Config/cloudinaryStorage"); // adjust path as needed

// POST route to upload image
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path; // this is the cloudinary image URL
    res.status(200).json({ success: true, imageUrl: imageUrl });
  } catch (error) {
    console.error("Image upload failed", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;

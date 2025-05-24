const express = require('express');
const router = express.Router();
const { UpdateProduct,DeleteProd, insertImages } = require('../Controller/admin-controller');

router.post("/updateProd/:id", UpdateProduct);
router.get("/deleteProd/:id", DeleteProd);
router.post("/UploadProd/:id", insertImages);

module.exports = router;
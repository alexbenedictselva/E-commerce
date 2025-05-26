const express = require('express');
const router = express.Router();
const { UpdateProduct,DeleteProd, insertImages } = require('../Controller/admin-controller');

router.post("/updateProd/:id", UpdateProduct);
router.delete("/deleteProd/:id", DeleteProd);
router.post("/UploadProd", insertImages);

module.exports = router;
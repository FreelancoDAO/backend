const express = require("express");
const router = express.Router();
const { uploadImage,
  uploadJson } = require("../controllers/ipfs");
const { upload } = require("../config/upload");

router.post("/upload_image", upload.single('file'), uploadImage);
router.post("/upload_json", uploadJson);


module.exports = router;
const express = require("express");
const imagesController = require("./imagesController");

const router = express.Router();

router.get("/meetings", imagesController.getMeetingImages);

module.exports = router;


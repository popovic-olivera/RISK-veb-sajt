const express = require("express");
const fileController = require("./fileController");

const router = new express.Router();

router.get("/:filename", fileController.getFileById);
router.post('/', fileController.uploadFile);

module.exports = router;

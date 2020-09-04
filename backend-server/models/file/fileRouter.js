const express = require("express");
const fileController = require("./fileController");

const router = new express.Router();

router.get("/:dirname/:filename", fileController.getFileById);
router.post('/', fileController.uploadFile);

module.exports = router;

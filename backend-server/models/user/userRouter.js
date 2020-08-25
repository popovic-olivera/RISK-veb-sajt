const express = require("express");
const jwt = require("express-jwt");
const userController = require("./userController");

const router = express.Router();

router.get("/:id", userController.getProfileById);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/:id", userController.updateProfile);

module.exports = router;



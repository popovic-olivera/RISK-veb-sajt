const express = require("express");
const jwt = require("express-jwt");
const userController = require("./userController");

const router = express.Router();

router.get("/:id", userController.getProfileById);

// FIXME Deprecated, replace with GET /:id
router.get("/profile", userController.getProfile);

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;



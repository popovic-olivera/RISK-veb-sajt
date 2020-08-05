const express = require("express");
const jwt = require("express-jwt");
const userController = require("./userController");

const router = express.Router();

const auth = jwt({
    secret: "MY_SECRET", // FIXME secret should not be within the source code
    algorithms: ['HS256'],
    userProperty: "payload"
});

router.get("/profile", auth, userController.getProfile);

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;



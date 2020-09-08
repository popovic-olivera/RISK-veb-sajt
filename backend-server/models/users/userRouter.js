const express = require("express");
const userController = require("./userController");
const resetPasswordController = require("./resetPasswordController");
const filterUsers = require("./filterUsers");

const router = express.Router();

router.get("/:id", userController.getProfileById);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/follow/:id", userController.followUser);
router.put("/unfollow/:id", userController.unfollowUser);
router.put("/:id", userController.updateProfile);

router.post("/filter", filterUsers.filter);

router.post("/reset-password", resetPasswordController.resetPassword);
router.post("/validate-password-token/:resetToken", resetPasswordController.validPasswordToken);
router.post("/set-new-password", resetPasswordController.newPassword);
router.post("/change-password/:id", resetPasswordController.changePassword);

module.exports = router;



const express = require("express");
const userController = require("../controllers/user.controller");
const identifyingUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  identifyingUser,
  userController.userFollowController,
);
userRouter.post(
  "/unfollow/:username",
  identifyingUser,
  userController.unfollowUserController,
);

module.exports = userRouter;

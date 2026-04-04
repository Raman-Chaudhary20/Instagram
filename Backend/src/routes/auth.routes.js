const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyingUser = require("../middlewares/auth.middleware");


authRouter.post("/register", authController.registerController);

authRouter.post("/login", authController.loginController)

authRouter.get("/get-me", identifyingUser, authController.getMeController)

module.exports = authRouter;

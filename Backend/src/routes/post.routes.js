const express = require("express")
const postController = require("../controllers/post.controller")
const postRouter = express.Router()
const multer = require("multer")
const identifyingUser = require("../middlewares/auth.middleware")
const upload = multer({Storage:multer.memoryStorage})

postRouter.post("/", upload.single("image"), identifyingUser, postController.createPostController)
postRouter.get("/", identifyingUser, postController.getPostController)
postRouter.get("/details/:postId", identifyingUser, postController.getPostDetailController)
postRouter.post("/like/:postId", identifyingUser, postController.createLikeController)
postRouter.get("/feed", identifyingUser, postController.getFeedController)

module.exports = postRouter;
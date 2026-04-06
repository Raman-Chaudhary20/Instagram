const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");
const likeModel = require("../model/likes.model");

const imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATEKEY });
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Insta-clone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

async function getPostDetailController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbbidden content",
    });
  }

  res.status(201).json({
    message: "Post fetched",
    post,
  });
}

async function createLikeController(req, res) {
  const user = req.user.username;
  const postId = req.params.postId;

  const isPostExist = await postModel.findById(postId);
  if (!isPostExist) {
    return res.status(404).json({
      message: "This post is not in database",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: user,
  });

  res.status(200).json({
    message: "Post liked",
    like,
  });
};

async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })

    return res.status(200).json({
        message: "post un liked successfully."
    })
}

async function getFeedController(req, res) {
  const user = req.user;

  const post = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      });
      post.isLiked = Boolean(isLiked);
      return post;
    }),
  );

  res.status(200).json({
    message: "Post fetched",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  createLikeController,
  getFeedController,
  unLikePostController
};

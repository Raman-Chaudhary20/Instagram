const followerModel = require("../model/followers.model");
const userModel = require("../model/user.model");

async function userFollowController(req, res) {
    
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "you are not follow yourself",
    });
  }

  try {
    await userModel.find({followee: followeeUsername});
  } catch (err) {
    return res.status(404).json({
      message: "Followee doesn't exist",
    });
  }

  const isFollowed = await followerModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isFollowed) {
    return res.status(200).json({
      message: `You are already follow ${followeeUsername}`,
    });
  }

  //   const followerData = await userModel.findById(followerId)
  //   const followeeData = await userModel.findById(followeeId)

  const followRecords = await followerModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecords,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollow = await followerModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollow) {
    return res.status(409).json({
      message: "You are not following this user",
    });
  }

  await followerModel.findByIdAndDelete(isUserFollow._id);

  res.status(200).json({
    message: "You are unfollowed this user",
  });
}

module.exports = { userFollowController, unfollowUserController };

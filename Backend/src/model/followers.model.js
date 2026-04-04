const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      ref: "users",
      required: [true, "Follower is required."],
    },
    followee: {
      type: String,
      ref: "users",
      required: [true, "Followee is required."],
    },
  },
  {
    timeStamp: true,
  },
);

followerSchema.index = ({ follower: 1, followee: 1 }, { unique: true });
const followerModel = mongoose.model("followers", followerSchema);
module.exports = followerModel;

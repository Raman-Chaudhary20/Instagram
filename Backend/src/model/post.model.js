const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },

  imageUrl: {
    type: String,
    required: [true, "Image url is required for create post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id is required for creating post"],
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;

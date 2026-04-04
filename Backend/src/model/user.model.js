const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "No user exist on this email"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://imgs.search.brave.com/lLASPdCMXLG7hjtQIeU4hfNZ3H_KmBYnVGo6c0_00M0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDkv/NzM0LzU2NC9zbWFs/bC9kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tb2Ytc29j/aWFsLW1lZGlhLXVz/ZXItdmVjdG9yLmpw/Zw",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

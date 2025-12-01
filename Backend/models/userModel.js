// models/userModel.js
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// This is the only way that works reliably in pure ESM projects in 2025
const { default: plm } = passportLocalMongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(plm);

const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export const User = mongoose.model("User", UserSchema);
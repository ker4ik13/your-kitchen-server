import mongoose from "mongoose";

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  firstName: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  email: { type: String },
  date: { type: String, required: true },
  tag: { type: String },
  location: { type: String },
});

export const Claim = mongoose.model("Claim", claimSchema);

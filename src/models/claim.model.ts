import mongoose from "mongoose";

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  firstName: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  email: { type: String },
  date: { type: String, required: true },
});

export const Claim = mongoose.model("Claim", claimSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photos: { type: [String], required: true },
  onMainPage: { type: Boolean },
});

export const Furniture = mongoose.model("Furniture", furnitureSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  options: {
    type: [String],
    required: true,
    enum: ['loft', 'classic', 'minimalism', 'hightech', 'chalet'],
  },
  photos: { type: [String], required: true },
  term: { type: String, required: true },
});

export const Kitchen = mongoose.model('Kitchen', kitchenSchema);
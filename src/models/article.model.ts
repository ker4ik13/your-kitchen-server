import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  preview: { type: String, required: true },
  content: { type: String, required: true },
  onMainPage: { type: Boolean },
  viewCount: { type: Number },
  createdAt: { type: String, required: true },
  updatedAt: { type: String },
});

export const Article = mongoose.model("Article", articleModel);
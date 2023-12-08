import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleModel = new Schema({
  title: { type: String, required: true },
  preview: { type: String, required: true },
  content: { type: String, required: true },
});

export const Article = mongoose.model("Article", articleModel);
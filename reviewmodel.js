import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  content: String,
  rating: Number,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

export const Review = mongoose.model('Review', reviewSchema);



import { Review } from "../models/review.model";

class ReviewService {
    async getReviews () {
        const reviews = await Review.find();
        return reviews;
    };

    async getReview (id: string) {
        const review = await Review.findById(id);
        return review;
    };

    async addReview (body: object) {
        const review = new Review(body);
        const result = await review.save();
        return result;
    };

    async deleteReview (id: string) {
        const review = await Review.findByIdAndDelete(id);
        return review;
    };

    async updateReview (id: string, body: object) {
        const review = await Review.findByIdAndUpdate(id, body, { new: true });
        return review;
    };

};

export default new ReviewService();
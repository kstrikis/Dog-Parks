import UserSerializer from "./UserSerializer.js"
import { User } from "../../models/index.js"

class ReviewSerializer {
    static async showReviewDetails(reviewsArray) {
        const newReviews = Promise.all( reviewsArray.map(async (review) => {

            const userId = review.userId
            const user = await User.query().findById(userId)
            const username = UserSerializer.showUsername(user)

            return {
                id: review.id,
                reviewText: review.reviewText,
                rating: review.rating,
                userName: username
            }
        }))
        return newReviews
    }
}

export default ReviewSerializer
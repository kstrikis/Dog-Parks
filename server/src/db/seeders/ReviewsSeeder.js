import { Review } from "../../models/index.js";

class ReviewSeeder {
    static async seed () {
        const reviews = [{
                reviewText: "My dog really likes this park, it is simple but fun for him",
                rating: 4,
                userId: 1,
                dogParkId: 1
            },
            {
                reviewText: "This park is not great. There are no amenities and it is too plain for my taste",
                rating: 1,
                userId: 2,
                dogParkId: 1
            },
            {
                reviewText: "The Common is a great place to take your dog. There are so many friendly people and pets to play with",
                rating: 5,
                userId: 2,
                dogParkId: 2
            },
            {
                reviewText: "Toomey Park sucks. It is one of the worst places in Cambridge",
                rating: 5,
                userId: 3,
                dogParkId: 3
            }]

        for (const review of reviews) {
            const inDB = await Review.query().findOne( {reviewText: review.reviewText} )
            if (!inDB) {
                await Review.query().insert(review)
            }
        }
    }
}

export default ReviewSeeder
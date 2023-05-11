import { Review, User, DogPark } from "../../models/index.js";

class ReviewSeeder {
    static async seed () {
        const exampleUser1 = await User.query().findOne({ email: "user@example.com" })
        const exampleUser2 = await User.query().findOne({ email: "hilary@example.com" })
        const exampleUser3 = await User.query().findOne({ email: "kriss@example.com" })
        const dogParkExample1 = await DogPark.query().findOne( {name: "Test Park 1"} )
        const dogParkExample2 = await DogPark.query().findOne( {name: "Boston Common"} )
        const dogParkExample3 = await DogPark.query().findOne( {name: "Toomey Park"} )

        const reviews = [{
                reviewText: "My dog really likes this park, it is simple but fun for him",
                rating: 4,
                userId: exampleUser1.id,
                dogParkId: dogParkExample1.id
            },
            {
                reviewText: "This park is not great. There are no amenities and it is too plain for my taste",
                rating: 1,
                userId: exampleUser2.id,
                dogParkId: dogParkExample1.id
            },
            {
                reviewText: "The Common is a great place to take your dog. There are so many friendly people and pets to play with",
                rating: 5,
                userId: exampleUser2.id,
                dogParkId: dogParkExample2.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/IMG_1303.jpg"
            },
            {
                reviewText: "Toomey Park sucks. It is one of the worst places in Cambridge",
                rating: 5,
                userId: exampleUser3.id,
                dogParkId: dogParkExample3.id
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
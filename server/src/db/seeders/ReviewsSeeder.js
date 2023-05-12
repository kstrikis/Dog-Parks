import { Review, User, DogPark } from "../../models/index.js";

class ReviewSeeder {
    static async seed () {
        const exampleUser1 = await User.query().findOne({ email: "user@example.com" })
        const exampleUser2 = await User.query().findOne({ email: "hilary@example.com" })
        const exampleUser3 = await User.query().findOne({ email: "kriss@example.com" })
        const dogParkExample1 = await DogPark.query().findOne( {name: "Thomas Park"} )
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
                userId: exampleUser3.id,
                dogParkId: dogParkExample2.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/IMG_1303.jpg"
            },
            {
                reviewText: "Toomey Park sucks. It is one of the worst places in Cambridge",
                rating: 5,
                userId: exampleUser3.id,
                dogParkId: dogParkExample3.id
            },
            {
                reviewText: "This is review 1 of Toomey Park in Cambridge.",
                rating: 1,
                userId: exampleUser1.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901077546"
            },
            {
                reviewText: "This is review 2 of Toomey Park in Cambridge.",
                rating: 2,
                userId: exampleUser2.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901091424"
            },
            {
                reviewText: "This is review 3 of Thomas Park in Cambridge.",
                rating: 3,
                userId: exampleUser3.id,
                dogParkId: dogParkExample1.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901105680"
            },
            {
                reviewText: "This is review 4 of Toomey Park in Cambridge.",
                rating: 4,
                userId: exampleUser1.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901116534"
            },
            {
                reviewText: "This is review 5 of Toomey Park in Cambridge.",
                rating: 5,
                userId: exampleUser3.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901127214"
            },
            {
                reviewText: "This is review 6 of Toomey Park in Cambridge.",
                rating: 1,
                userId: exampleUser1.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901137238"
            },
            {
                reviewText: "This is review 7 of Toomey Park in Cambridge.",
                rating: 2,
                userId: exampleUser2.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901146154"
            },
            {
                reviewText: "This is review 8 of Toomey Park in Cambridge.",
                rating: 3,
                userId: exampleUser3.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901166954"
            },
            {
                reviewText: "This is review 9 of Toomey Park in Cambridge.",
                rating: 4,
                userId: exampleUser2.id,
                dogParkId: dogParkExample3.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901176665"
            },
            {
                reviewText: "This is review 1 of Boston Common.",
                rating: 5,
                userId: exampleUser2.id,
                dogParkId: dogParkExample2.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901185502"
            },
            {
                reviewText: "This is review 2 of Boston Common.",
                rating: 1,
                userId: exampleUser2.id,
                dogParkId: dogParkExample2.id, 
                imageUrl: "https://dog-parks-production.s3.amazonaws.com/1683901194872"
            },
        ]

        for (const review of reviews) {
            const inDB = await Review.query().findOne( {reviewText: review.reviewText} )
            if (!inDB) {
                await Review.query().insert(review)
            }
        }
    }
}

export default ReviewSeeder
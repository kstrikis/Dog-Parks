import { DogPark, Review, User } from "../../models/index.js"
import GooglePlacesClient from "../../apiClient/GooglePlacesClient.js"

class GoogleApiParksSeeder {
    static async seed() {
        const googleApiUserId = (await User.query().findOne({ email: "googleAPI@example.com" })).id
        console.log("google user id is:",googleApiUserId)
        const parks = await GooglePlacesClient.getDogParks()
        console.log("parks from google passed")
        Promise.all(parks.map(async (park) => {
            console.log("inside promise")
            const inDB = await DogPark.query().findOne({ name: park.name })
            // const inDB = null
            console.log("inDB is:",inDB)
            if (!inDB) {
                const newPark = await DogPark.query().insertAndFetch(park)
                const reviews = await GooglePlacesClient.getReviews(park.placeId, newPark.id)
                reviews.map(async (review) => {
                    const reviewToInsert = { ...review, userId: googleApiUserId}
                    await newPark.$relatedQuery("reviews").insert(reviewToInsert)
                })
            }
        }))
    }
}

export default GoogleApiParksSeeder
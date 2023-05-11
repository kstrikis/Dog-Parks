import { DogPark, Review, User } from "../../models/index.js"
import GooglePlacesClient from "../../apiClient/GooglePlacesClient.js"

class GoogleApiParksSeeder {
    static async seed() {
        const googleApiUserId = (await User.query().findOne({ email: "googleAPI@example.com" })).id
        const parks = await GooglePlacesClient.getDogParks()
        
        for (const park of parks) {
            const inDB = await DogPark.query().findOne({ name: park.name })

            if (!inDB) {
                const reviews = await GooglePlacesClient.getReviews(park.placeId)
                let parkWithoutPlace = {...park}
                delete parkWithoutPlace.placeId
                const newPark = await DogPark.query().insertAndFetch(parkWithoutPlace)
                if(reviews.length > 0) {
                    reviews.map(async (review) => {
                        const reviewToInsert = { ...review, userId: googleApiUserId }
                        await newPark.$relatedQuery("reviews").insert(reviewToInsert)
                    })
                }
            }
        }
    }
}

export default GoogleApiParksSeeder
import { DogPark, Review, User } from "../../models/index.js"
import GooglePlacesClient from "../../apiClient/GooglePlacesClient.js"

class GoogleApiParksSeeder {
    static async seed() {
        const googleApiUserId = (await User.query().findOne({ email: "googleAPI@example.com" })).id
        // console.log("google user id is:",googleApiUserId)
        const parks = await GooglePlacesClient.getDogParks()
        // console.log(parks)
        for (const park of parks) {
            const inDB = await DogPark.query().findOne({ name: park.name })

            if (!inDB) {
                const reviews = await GooglePlacesClient.getReviews(park.placeId)
                let parkWithoutPlace = {...park}
                delete parkWithoutPlace.placeId
                const newPark = await DogPark.query().insertAndFetch(parkWithoutPlace)
                // console.log(reviews)
                // reviews.map(async (review) => {
                //     const reviewToInsert = { ...review, userId: googleApiUserId}
                //     await newPark.$relatedQuery("reviews").insert(reviewToInsert)
                // })
                // console.log(newPark, "end of google seeder")
            }
        }
        // parks.forEach(async (park) => {
        //     console.log("inside promise")
        //     // const inDB = null
           
        // })
    }
}

export default GoogleApiParksSeeder
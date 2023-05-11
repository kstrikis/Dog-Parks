import got from "got"
import config from "../config.js"
import DogPark from "../models/DogPark.js"

class GooglePlacesClient {
    static async getOverview(placeId) {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,reviews,rating,geometry/location&key=${config.googleKey}`
            const apiResponse = await got(url)
            const responseBody = apiResponse.body.result

            let overview = "There is no description available for this park."
            if (responseBody.editorial_summary) {
                overview = responseBody.editorial_summary.overview
            }
            return overview
        } catch(err) {
            return { errors: err.message }
        }
    }

    static async getReviews(googlePlaceId) {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name,formatted_address,reviews,rating,geometry/location&key=${config.googleKey}`
            const apiResponse = await got(url)
            const parsedBody = await JSON.parse(apiResponse.body)
            
            const responseReviews = parsedBody.result.reviews
            // console.log(responseReviews)
            const returnedReviews = []
            responseReviews.forEach(review => {
                const returnedReview = {
                    rating: review.rating,
                    reviewText: review.text
                }
                if(returnedReview.reviewText.length > 20){
                returnedReviews.push(returnedReview)
                }
            })
            return returnedReviews
        } catch(err) {
            return { errors: err.message }
        }
    }

    static async getDogParks() {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog%20park&inputtype=textquery&fields=formatted_address%2Cname&key=${config.googleKey}`
            const apiResponse = await got(url)
            const responseBody = await JSON.parse(apiResponse.body)
            // console.log("get dog parks response body: ",responseBody)
            // console.log("get dog parks response body keys: ",Object.keys(responseBody))
            // console.log("get dog parks response body results: ",responseBody.html_attributions)
            // console.log("get dog parks response body results: ",responseBody.results)

            const returnedParks = Promise.all(responseBody.results.map(async (park) => {
                return {
                    name: park.name,
                    address: park.formatted_address,
                    // description: this.getOverview(park.place_id),
                    description: "There is no description available for this park.",
                    placeId: park.place_id
                }
            }))
            return returnedParks
        } catch(err) {
            return { errors: err.message }
        }
    }
}

export default GooglePlacesClient
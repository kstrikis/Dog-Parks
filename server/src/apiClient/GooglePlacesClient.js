import got from "got"
import config from "../config.js"

class GooglePlacesClient {
    static async getOverview(placeId) {
        try {
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,reviews,rating,geometry/location,editorial_summary&key=${config.googleKey}`
            const apiResponse = await got(url)
            const responseParsed = JSON.parse(apiResponse.body)
            const responseBody = responseParsed.result
            let overview = "There is no description available for this park."
            if (responseBody.editorial_summary !== undefined) {
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
            const returnedReviews = []
            responseReviews.forEach(review => {
                const returnedReview = {
                    rating: review.rating,
                    reviewText: review.text
                }
                if (returnedReview.reviewText.length > 20) {
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
            const returnedParks = Promise.all(responseBody.results.map(async (park) => {
                return {
                    name: park.name,
                    address: park.formatted_address,
                    description: await this.getOverview(park.place_id),
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
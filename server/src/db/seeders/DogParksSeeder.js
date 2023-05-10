import { DogPark } from "../../models/index.js"
import { Client } from "@googlemaps/google-maps-services-js"
import configuration from "../../config.js"

class DogParksSeeder {
    static async fetchApiData() {
        const response = await fetch("")
        const responseBody = response.json()

        const client = new Client({})

        // get Google user ID
        // get list of dog parks
        //for each park, add to DB
        // also get all reviews using that park's place ID
        // add each review to DB associated with the park, and with the Google user
    }

    static async seed()
    {
        const dogParks = [{
            name: "Test Park 1",
            description: "This is a place to bring T-posed pups",
            address: "123 Fake St.",
        },
        {
            name: "Boston Common",
            description: "A large area in downtown Boston, fits many dogs but restricted to one designated area.",
            address: "139 Tremont St., Boston, MA 02111",
            neighborhood: "Beacon Hill",
            hasTrash: true,
            hasBags: true,
            hasFence: false,
            hasWater: false,
            hasBenches: true

        },
        {
            name: "Toomey Park",
            description: "The City of Cambridge has partnered with the Cambridge Redevelopment Authority (CRA) to establish a temporary off-leash dog park at the CRA’s 3rd and Binney Street Civic Space located at 174 Binney Street. The dog park is scheduled to open on Monday, January 11, 2021 and be operational through Fall 2021 while park construction is underway.",
            address: "242 Third St., Cambridge, MA 02141",
            neighborhood: "Kendall Square",
            hasFence: true,
            hasWater: true
        }]

        for (const park of dogParks) {
            const inDB = await DogPark.query().findOne( {name: park.name, address: park.address} )
            if (!inDB) {
                await DogPark.query().insert(park)
            }
        }
    }
}

export default DogParksSeeder
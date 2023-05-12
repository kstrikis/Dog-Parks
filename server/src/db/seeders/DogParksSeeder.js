import { DogPark } from "../../models/index.js"

class DogParksSeeder {
    static async seed() {
        const dogParks = [{
            name: "Thomas Park",
            description: "This is Youk's favorite place in the whole wide world. Perched atop a hill, this delightful park provides stunning city views that both humans and furry friends can appreciate. The area's open space and slopes make it the perfect spot for energetic pups like Youk to run, play, and socialize with their canine companions.",
            address: "Thomas Park, Boston, MA 02127",
            neighborhood: "South Boston",
            hasTrash: true,
            hasBags: false,
            hasFence: false,
            hasWater: true,
            hasBenches: true
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
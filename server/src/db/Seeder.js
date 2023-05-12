/* eslint-disable no-console */
import { connection } from "../boot.js"
import DogParksSeeder from "./seeders/DogParksSeeder.js"
import UsersSeeder from "./seeders/UsersSeeder.js"
import ReviewSeeder from "./seeders/ReviewsSeeder.js"
import GoogleApiParksSeeder from "./seeders/GoogleApiParksSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding users...")
    await UsersSeeder.seed()

    console.log("Seeding dog parks...")
    await DogParksSeeder.seed()
    
    console.log("Seeding parks via Google Places API...")
    await GoogleApiParksSeeder.seed()
    
    console.log("Seeding reviews...")
    await ReviewSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
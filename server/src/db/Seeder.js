/* eslint-disable no-console */
import { connection } from "../boot.js"
import DogParksSeeder from "./seeders/DogParksSeeder.js"
import UsersSeeder from "./seeders/UsersSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding dog parks...")
    await DogParksSeeder.seed()
    
    console.log("Seeding users...")
    await UsersSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
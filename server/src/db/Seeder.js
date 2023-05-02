/* eslint-disable no-console */
import { connection } from "../boot.js"
import DogParksSeeder from "./seeders/dogParksSeeder.js"

class Seeder {
  static async seed() {

    console.log("Seeding dog parks...")
    await DogParksSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
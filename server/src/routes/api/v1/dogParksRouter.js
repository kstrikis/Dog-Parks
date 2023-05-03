import express from "express"
import { DogPark } from "../../../models/index.js"
import DogParksSerializer from "../../../db/serializers/DogParksSerializer.js"

const dogParksRouter = new express.Router()

dogParksRouter.get("/", async (req, res) => {
    try {
        const parks = await DogPark.query()
        const serializedParks = DogParksSerializer.showDetailsForList(parks)
        res.set({"Content-Type": "application/json"}).status(200).json( {parks: serializedParks} )
    } catch(err) {
        res.set({"Content-Type": "application/json"}).status(500).json( {errors: err} )
    }
})

export default dogParksRouter
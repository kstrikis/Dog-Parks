import express from "express"
import { DogPark, Review } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
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

dogParksRouter.post("/", async (req, res) => {
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.park)
        const park = await DogPark.query().insertAndFetch(cleanedInput)
        res.set({"Content-Type": "application/json"}).status(201).json({ park: park })
    } catch(err) {
        if (err instanceof ValidationError) {
            res.set({"Content-Type": "application/json"}).status(422).json({ errors: err.data })
        } else {
            res.set({"Content-Type": "application/json"}).status(500).json({ errors: err })
        }
    }
})

dogParksRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    
    try{
        const park = await DogPark.query().findById(id)
        const serializedPark = await DogParksSerializer.detailsForShow(park)
        return res.status(200).json({ park: serializedPark })
    } catch (err) {
        return res.status(500).json({ errors: err})
    }
})

dogParksRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        const park = await DogPark.query().findById(id)
        const serializedPark = DogParksSerializer.detailsForShow(park)
        const parkReviews = await park.$relatedQuery("reviews")
        Promise.all(parkReviews.map( async(review) => {
            await Review.query().deleteById(review.id)
        }))
        await DogPark.query().deleteById(id)
        return res.status(200).json({ park: serializedPark })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default dogParksRouter
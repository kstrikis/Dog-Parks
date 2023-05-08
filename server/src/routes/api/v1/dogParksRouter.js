import express from "express"
import { DogPark, Review } from "../../../models/index.js"
import objection from "objection"
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

dogParksRouter.post("/:id", async (req, res) => {  
    try {
        const { body } = req
        const userId = req.user.id
        body.review.userId = userId
        const { id } = req.params
        body.review.dogParkId = id
        const cleanedInput = cleanUserInput(body.review)
        const review = await Review.query().insertAndFetch(cleanedInput)
        const park = await DogPark.query().findById(id)
        const serializedPark = await DogParksSerializer.detailsForShow(park)
        res.set({"Content-Type": "application/json"}).status(201).json({ park: serializedPark })
    } catch(err) {
        if (err instanceof ValidationError) {
            res.set({"Content-Type": "application/json"}).status(422).json({ errors: err.data })
        } else {
            res.set({"Content-Type": "application/json"}).status(500).json({ errors: err })
        }
    }
})

export default dogParksRouter
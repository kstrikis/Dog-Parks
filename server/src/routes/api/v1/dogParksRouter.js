import express from "express"
import { DogPark } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import DogParksSerializer from "../../../db/serializers/DogParksSerializer.js"
import parksReviewRouter from "./parksReviewRouter.js"

const dogParksRouter = new express.Router()
dogParksRouter.use("/:id/reviews", parksReviewRouter)

dogParksRouter.get("/", async (req, res) => {
    try {
        const parks = await DogPark.query()
        const serializedParks = DogParksSerializer.showDetailsForList(parks)
        res.status(200).json( {parks: serializedParks} )
    } catch(err) {
        res.status(500).json( {errors: err.message } )
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
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message })
        }
    }
})

dogParksRouter.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    try {
        const park = await DogPark.query().findById(id)
        const serializedPark = await DogParksSerializer.detailsForEdit(park)
        return res.status(200).json({ park: serializedPark })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

dogParksRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const park = await DogPark.query().findById(id)
        const serializedPark = await DogParksSerializer.detailsForShow(park)
        return res.status(200).json({ park: serializedPark })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

dogParksRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        await DogPark.query().deleteById(id)
        return res.status(200).json({ message: "Dog park successfully deleted" })
    } catch (err) {
        return res.status(500).json({ errors: err.message })
    }
})

dogParksRouter.patch("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.park)
        const editedPark = await DogPark.query().patchAndFetchById(id, cleanedInput)
        const serializedPark = await DogParksSerializer.detailsForShow(editedPark)
        return res.status(200).json({ park: serializedPark })
    } catch(err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message })
        }
    }
})

export default dogParksRouter
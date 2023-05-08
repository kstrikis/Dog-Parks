import express from "express"
import { Review } from "../../../models/index.js"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../db/serializers/ReviewSerializer.js"

const parksReviewRouter = new express.Router({ mergeParams: true })
parksReviewRouter.post("/", async (req, res) => {  
    try {
        const { body } = req
        const cleanedInput = cleanUserInput(body.review)
        const userId = req.user.id
        cleanedInput.userId = userId
        const { id } = req.params
        cleanedInput.dogParkId = id
        const review = await Review.query().insertAndFetch(cleanedInput)
        const serializedReview = await ReviewSerializer.serializeReview(review)
        res.status(201).json({ review: serializedReview })
    } catch(err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            res.status(500).json({ errors: err.message })
        }
    }
})

export default parksReviewRouter
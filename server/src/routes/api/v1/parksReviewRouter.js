import express from "express"
import { Review } from "../../../models/index.js"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../db/serializers/ReviewSerializer.js"
import uploadImage from "../../../services/uploadImage.js"

const parksReviewRouter = new express.Router({ mergeParams: true })
parksReviewRouter.post("/", uploadImage.single("image"), async (req, res) => {  
    try {
        const { body } = req
        const imageUrl = req.file ? req.file.location : null
        const bodyWithImageUrl = { ...body, imageUrl: imageUrl }
        delete bodyWithImageUrl.image
        const cleanedInput = cleanUserInput(bodyWithImageUrl)
        const userId = req.user.id
        const { id } = req.params
        cleanedInput.userId = userId
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
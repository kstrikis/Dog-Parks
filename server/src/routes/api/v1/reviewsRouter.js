import express from 'express'
import { Review } from '../../../models/index.js'
import uploadImage from '../../../services/uploadImage.js'
import objection from "objection"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Review.query().deleteById(id)
        res.status(200).json({ message: "Review successfully deleted" })
    } catch(err) {
        res.status(500).json({ errors: err.message })
    }
})

reviewsRouter.get("/", async (req, res) => {
    try{
    } catch (error) {
        res.status(500).json({ errors: error.message })
    }
})

reviewsRouter.get("/image", async (req, res) => {
    try {
        const reviewToReturn = await Review.query().findById(req.review.id)
        const imageReview  = reviewToReturn.imageUrl 
        return res.status(200).json({ image: imageReview })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

reviewsRouter.post("/image", uploadImage.single("image"), async (req, res) => {
    try {
        const { body } = req
        console.log(req.file.location)
        console.log("after parse: ", body.json())

        const data = {
            ...body,
            // image: req.file.location,
            image: "",
        }
        const review = await Review.query().findById(req.review.id)
        await req.review.query().insertAndFetch(data)
        return res.status(201).json({ image: review.imageUrl })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ errors: error })
    }
})

export default reviewsRouter
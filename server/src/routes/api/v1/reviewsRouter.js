import express from 'express'
import { Review } from '../../../models/index.js'

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

export default reviewsRouter
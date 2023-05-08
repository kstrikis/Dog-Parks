import React, { useState, useEffect } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"

const NewParkReviewForm = (props) => {
    const parkId = props.parkId
    const defaultReview = {
        rating: "",
        reviewText: ""
    }
    const [newReview, setNewReview] = useState(defaultReview)
    const [errors, setErrors] = useState([])

    const postNewParkReview = async () => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {review: newReview} )
            })
            const responseBody = await response.json()
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = await response.json()
                    throw new Error(errorMessage)
                }
            }
            const newPark = {...props.park}
            newPark.reviews.push(responseBody.review)
            props.setPark(newPark)
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }

    const handleInputChange = event => {
            setNewReview({
                ...newReview,
                [event.currentTarget.name]: event.currentTarget.value
            })
        }

    const handleSubmit = event => {
        event.preventDefault()
        postNewParkReview()
        clearForm()
    }

    const clearForm = () => {
        setNewReview(defaultReview)
    }

    return (
        <div className="review-form">
            <h1 className="list-link">Add a New Review</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <label className="dark-text">
                    Rating:
                    <input
                        className="form-field-input left-margin"
                        type="integer"
                        name="rating"
                        onChange={handleInputChange}
                        value={newReview.rating}
                    />
                </label>              
                <label className="dark-text">
                    Review:
                    <input
                        className="form-field-input"
                        type="text"
                        name="reviewText"
                        onChange={handleInputChange}
                        value={newReview.reviewText}
                    />
                </label>
                <input className="form-button" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewParkReviewForm
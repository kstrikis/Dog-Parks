import React, { useState, useEffect } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";

const NewParkReviewForm = (props) => {
    const parkId = props.parkId
    const defaultReview = {
        rating: "",
        reviewText: ""
    }
    const [newReview, setNewReview] = useState(defaultReview)
    const [errors, setErrors] = useState([])

    const checkedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={solidStar} />
    const uncheckedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={thinStar} />

    const postNewParkReview = async () => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {review: newReview} )
            })
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
            const responseBody = await response.json()
            props.setPark({
                ...props.park,
                reviews: [...props.park.reviews, responseBody.review]
            })
        } catch(error) {
            console.error("Error in fetch", error.message)
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

    const handleStarClick = (event) => {
        const ratingValue = event.currentTarget.value
        setNewReview({
          ...newReview,
          rating: ratingValue
        })
      }

    console.log(newReview.rating)

    return (
        <div className="review-form">
            <h1 className="list-link form-header-text">Add a New Review</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <div className="rating">
                    <input className="hide-radio" type="radio" id="star5" name="rating" value="5" onChange={handleStarClick}/>
                    <label htmlFor="star5">{uncheckedIcon}</label>
                    <input className="hide-radio" type="radio" id="star4" name="rating" value="4" onChange={handleStarClick}/>
                    <label htmlFor="star4">{uncheckedIcon}</label>
                    <input className="hide-radio" type="radio" id="star3" name="rating" value="3" onChange={handleStarClick}/>
                    <label htmlFor="star3">{uncheckedIcon}</label>
                    <input className="hide-radio" type="radio" id="star2" name="rating" value="2" onChange={handleStarClick}/>
                    <label htmlFor="star2">{uncheckedIcon}</label>
                    <input className="hide-radio" type="radio" id="star1" name="rating" value="1" onChange={handleStarClick}/>
                    <label htmlFor="star1">{uncheckedIcon}</label>    
                </div>
                <label className="dark-text bold-text">
                    Review:
                    <input
                        className="form-field-input"
                        type="text"
                        name="reviewText"
                        onChange={handleInputChange}
                        value={newReview.reviewText}
                    />
                </label>
                <input className="form-button-dark" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewParkReviewForm
import React, { useState, useEffect } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import Dropzone from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";

const NewParkReviewForm = (props) => {
    const parkId = props.parkId
    const defaultReview = {
        rating: "",
        reviewText: "",
        image: {}
    }
    const defaultImageAddedText = "Add an Image to your Review - drag 'n' drop or click to upload"
    const [newReview, setNewReview] = useState(defaultReview)
    const [errors, setErrors] = useState([])
    const [imageAdded, setImageAdded] = useState(defaultImageAddedText)

    const uncheckedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={thinStar} />

    const postNewParkReview = async () => {
        const newImageBody = new FormData()
        newImageBody.append("rating", newReview.rating)
        newImageBody.append("reviewText", newReview.reviewText)
        newImageBody.append("image", newReview.image)

        try {
            const response = await fetch(`/api/v1/parks/${parkId}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Accept": "image/jpeg"
                }),
                body: newImageBody
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
        } catch(err) {
            console.error("Error in fetch", err)
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
        setImageAdded(defaultImageAddedText)
    }

    const handleImageUpload = (acceptedImage) => {
        setNewReview({
            ...newReview, image:acceptedImage[0]
        })
        setImageAdded("Image added")
    }

    const handleStarClick = (event) => {
        const ratingValue = event.currentTarget.value
        setNewReview({
          ...newReview,
          rating: ratingValue
        })
    }

    return (
        <div className="review-form">
            <h1 className="list-link form-header-text">Add a New Review</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <label className="dark-text bold-text center-text">
                    Rating:
                    <div className="rating smaller-margin-top">
                        <input type="radio" id="star5" name="rating" value="5" onChange={handleStarClick} checked={newReview.rating === "5"} key="star5" />
                        <label htmlFor="star5">{uncheckedIcon}</label>
                        <input type="radio" id="star4" name="rating" value="4" onChange={handleStarClick} checked={newReview.rating === "4"} key="star4" />
                        <label htmlFor="star4">{uncheckedIcon}</label>
                        <input type="radio" id="star3" name="rating" value="3" onChange={handleStarClick} checked={newReview.rating === "3"} key="star3" />
                        <label htmlFor="star3">{uncheckedIcon}</label>
                        <input type="radio" id="star2" name="rating" value="2" onChange={handleStarClick} checked={newReview.rating === "2"} key="star2" />
                        <label htmlFor="star2">{uncheckedIcon}</label>
                        <input type="radio" id="star1" name="rating" value="1" onChange={handleStarClick} checked={newReview.rating === "1"} key="star1" />
                        <label htmlFor="star1">{uncheckedIcon}</label>
                    </div>
                </label>
                <label className="dark-text bold-text small-margin-top">
                    Review:
                    <textarea
                        className="form-field-input text-box-review-form"
                        name="reviewText"
                        onChange={handleInputChange}
                        value={newReview.reviewText}
                    />
                </label>
                <Dropzone onDrop={handleImageUpload} >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()} >
                                <input {...getInputProps()} />
                                <p className="callout" >{imageAdded}</p>
                            </div>
                        </section>
                    )} 
                </Dropzone>
                <input className="form-button-dark" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewParkReviewForm
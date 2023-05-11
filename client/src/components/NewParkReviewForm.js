import React, { useState, useEffect } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import Dropzone from "react-dropzone"

const NewParkReviewForm = (props) => {
    const parkId = props.parkId
    const defaultReview = {
        rating: "",
        reviewText: "",
        image: {}
    }
    const [newReview, setNewReview] = useState(defaultReview)
    const [errors, setErrors] = useState([])
    const [imageAdded, setImageAdded] = useState("Add an Image to your Review - drag 'n' drop or click to upload")

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
    }

    const handleImageUpload = (acceptedImage) => {
        setNewReview({
            ...newReview, image:acceptedImage[0]
        })
        setImageAdded("Image added")
    }

    return (
        <div className="review-form">
            <h1 className="list-link form-header-text">Add a New Review</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <label className="dark-text bold-text">
                    Rating:
                    <input
                        className="form-field-input left-margin"
                        type="integer"
                        name="rating"
                        onChange={handleInputChange}
                        value={newReview.rating}
                    />
                </label>              
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
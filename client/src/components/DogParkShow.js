import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewTile from "./ReviewTile"
import NewParkReviewForm from "./NewParkReviewForm"

const DogParkShow = (props) => {
    const [park, setPark] = useState({
        name: "",
        address: "",
        description: "",
        tags: [],
        reviews: []
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const parkId = props.match.params.id

    let isAdmin = false
    let classHideSignedOutUser = "hide"
    if (props.user) {
        isAdmin = props.user.isAdmin
        classHideSignedOutUser = ""
    }
    
    const getPark = async() => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setPark(body.park)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const parkTags = park.tags.map(tag => {
        return <p className="tag-cloud-individual-tag">{tag}</p>
    })

    const deleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}/reviews/${reviewId}`, { method: "DELETE"})
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const newReviews = park.reviews.filter(review => {
                return (review.id !== reviewId)
            })
            setPark({...park, reviews: newReviews })
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const handleOnClickDeleteReview = (event, reviewId) => {
        event.preventDefault()
        deleteReview(reviewId)
    }

    const reviewsList = park.reviews.map(review => {
        let userId = null
        if (props.user) {
            userId = props.user.id
        }
        let deleteButton = ""
        if (isAdmin || review.userId === userId) {
            deleteButton =
                <button
                    className="button"
                    onClick={(event) => {
                    handleOnClickDeleteReview(event, review.id)}}>
                        Delete review
                </button>
        }
        return (
            <>
                <ReviewTile key={review.id} {...review}/>
                {deleteButton}
            </>
        )
    })

    useEffect(() => {
        getPark()
    }, [])

    const deletePark = async () => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}`, { method: "DELETE"})
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            setShouldRedirect(true)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    const handleOnClickDeletePark = (event) => {
        event.preventDefault()
        deletePark()
    }

    if (shouldRedirect) {
        return <Redirect push to="/" />
    } 

    let classHideNotAdmin = "hide"
    if (isAdmin) {
        classHideNotAdmin = ""
    }
    const message = "Delete this dog park"

    return (
        <div className="dog-show-page">
            <div className="grid-y align-left">
                <div className="title-group">
                    <h1>{park.name}</h1>
                    <button onClick={handleOnClickDeletePark} className={`button ${classHideNotAdmin}`}>{isAdmin && message}</button>
                </div>
                <div className="dog-parks-information">
                    <p>{park.address}</p>
                    <p>{park.description}</p>
                </div>
                <div className="tag-cloud">
                    {parkTags}
                </div>
                <div className="dog-parks-information">
                    <p className="date-text">Last Updated: {park.updatedAt}</p>
                </div>
                <div className={classHideSignedOutUser}>
                    <NewParkReviewForm parkId={parkId} park={park} setPark={setPark}/>
                </div>
                <div className="show-page-reviews">
                    <h3>Review List</h3>
                    {reviewsList} 
                </div>
            </div>
        </div>
    )
}

export default DogParkShow
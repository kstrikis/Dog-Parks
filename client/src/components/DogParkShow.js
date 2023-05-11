import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewTile from "./ReviewTile"
import NewParkReviewForm from "./NewParkReviewForm"
import { format } from 'date-fns'

const DogParkShow = (props) => {
    const [park, setPark] = useState({
        name: "",
        address: "",
        description: "",
        tags: [],
        reviews: []
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [shouldRedirectEdit, setShouldRedirectEdit] = useState(false)

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
            const response = await fetch(`/api/v1/reviews/${reviewId}`, { method: "DELETE"})
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

    const reviewsListOrganic = park.reviews.map(review => {
        const currentUser = props.user
        if (review.userName !== "Review From Google Maps") {
            return (
                <ReviewTile key={review.id} {...review} currentUser={currentUser} isAdmin={isAdmin} handleOnClickDeleteReview={handleOnClickDeleteReview}/>
            )
        }
    })

    const reviewsListGoogle = park.reviews.map(review => {
        const currentUser = props.user
        if (review.userName === "Review From Google Maps") {
            return (
                <ReviewTile key={review.id} {...review} currentUser={currentUser} isAdmin={isAdmin} handleOnClickDeleteReview={handleOnClickDeleteReview}/>
            )
        }
    })

    const formattedDate = format(new Date(park.updatedAt), 'MMMM DD, YYYY')

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

    const handleOnClickEditPark = (event) => {
        event.preventDefault()
        setShouldRedirectEdit(true)
    }
    
    if (shouldRedirectEdit) {
        return <Redirect push to={`/parks/${parkId}/edit`} />
    } 

    if (shouldRedirect) {
        return <Redirect push to="/parks" />
    } 

    let classHideNotAdmin = "hide"
    if (isAdmin) {
        classHideNotAdmin = ""
    }
    const deleteMessage = "Delete this dog park"
    const editMessage = "Edit this dog park"

    return (
        <div className="dog-show-page">
            <div className="grid-y align-left">
                <div className="same-line">
                    <h1 className="park-show-header">{park.name}</h1>
                    <div className="button-group">
                        <button onClick={handleOnClickDeletePark} className={`delete-button-dark right-side ${classHideNotAdmin}`}>{isAdmin && deleteMessage}</button>
                        <button onClick={handleOnClickEditPark} className={`delete-button-dark right-side ${classHideNotAdmin}`}>{isAdmin && editMessage}</button>
                    </div>
                </div>
                <div className="dog-parks-information-section">
                    <p className="address-bold">{park.address}</p>
                    <p className="dog-parks-description">{park.description}</p>
                </div>
                <div className="tag-cloud dog-parks-information-section">
                    {parkTags}
                </div>
                <div className="dog-parks-information-section">
                    <p className="date-text">Last Updated: {formattedDate}</p>
                </div>
                <div className={classHideSignedOutUser}>
                    <NewParkReviewForm parkId={parkId} park={park} setPark={setPark}/>
                </div>
                <div className="show-page-reviews">
                    <div className="row grid-x">
                        <div className="small-6 columns end">
                            <h3 className="review-list-header">Review List</h3>
                            {reviewsListOrganic} 
                        </div>
                        <div className="small-6 columns end">
                            <h3 className="review-list-header">Reviews from Google Maps</h3>
                            {reviewsListGoogle} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogParkShow
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

    const reviewsList = park.reviews.map(review => {
        return (
            <ReviewTile key={review.id} {...review}/>
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

    const handleOnClickDelete = (event) => {
        event.preventDefault()
        deletePark()
    }

    if (shouldRedirect) {
        return <Redirect push to="/" />
    } 

    let isAdmin = false
    if (props.user) {
        isAdmin = props.user.isAdmin
    }
    let classHideNotAdmin = "hide"
    if (isAdmin) {
        classHideNotAdmin = ""
    }
    const message = "Delete this dog park"

    let classHideSignedOutUser = "hide"
    if (props.user) {
        classHideSignedOutUser = ""
    }

    return (
        <div className="dog-show-page">
            <div className="grid-y align-left">
                <div className="title-group">
                    <h1>{park.name}</h1>
                    <button onClick={handleOnClickDelete} className={`button ${classHideNotAdmin}`}>{isAdmin && message}</button>
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
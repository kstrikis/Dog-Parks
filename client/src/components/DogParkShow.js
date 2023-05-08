import React, { useState, useEffect } from "react"
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

    return (
        <div className="dog-show-page">
            <div className="grid-y align-left">
                <h1>{park.name}</h1>
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
                    <NewParkReviewForm parkId={parkId} park={park} setPark={setPark}/>
                <div className="show-page-reviews">
                    <h3>Review List</h3>
                    {reviewsList} 
                </div>
            </div>
        </div>
    )
}

export default DogParkShow
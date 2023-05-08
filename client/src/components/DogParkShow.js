import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewTile from "./ReviewTile"

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

    if(shouldRedirect) {
        return <Redirect push to="/" />
    } 

    let isAdmin = false
    if(props.user) {
        isAdmin = props.user.isAdmin
    }
    const message = "Delete this dog park"

    return (
        <div className="dog-show-page">
            <div className="grid-y align-left">
                <h1>{park.name}</h1>
                <a onClick={handleOnClickDelete} href="#" className="help-text">{isAdmin && message}</a>
                <div className="dog-parks-information">
                    <p>{park.address}</p>
                    <p>{park.description}</p>
                    <p className="date-text">Last Updated: {park.updatedAt}</p>
                </div>
                <section className="tag-cloud-section">
                    <h5 className="tag-cloud-title">Park Amenities</h5>
                    <div className="tag-cloud">
                        {parkTags}
                    </div>
                </section>
                <div className="show-page-reviews">
                    <h3>Review List</h3>
                    {reviewsList} 
                </div>
            </div>
        </div>
    )
}

export default DogParkShow
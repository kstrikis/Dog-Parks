import React, { useState, useEffect } from "react"

const DogParkShow = (props) => {
    const [park, setPark] = useState({
        name: "",
        address: "",
        description: "",
        tags: []
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
                    <p className="date-text">Last Updated: {park.updatedAt}</p>
                </div>
                <section className="tag-cloud-section">
                    <h5 className="tag-cloud-title">Park Amenities</h5>
                    <div className="tag-cloud">
                        {parkTags}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DogParkShow
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const DogParksList = props => {
    const [ dogParks, setDogParks ] = useState([])

    const getParks = async () => {
        try {
            const response = await fetch("/api/v1/parks")
            const responseBody = await response.json()
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            setDogParks(responseBody.parks)
        } catch(err) {
            console.error("Error in fetch",err.message)
        }
    }

    useEffect(() => {
        getParks()
    }, [])

    const parksList = dogParks.map(park => {
        return (
            <div className="callout dog-parks-list-item">
                <Link className="list-link" to={`/parks/${park.id}`}> {`${park.name}`}</Link>
                <p>{park.address}</p>
            </div>
        )
    })
    
    return (
        <div className="dog-parks-index">
            <div className="dog-parks-list">
                {parksList}
            </div>
            <Link className="add-park-link" to="/parks/new">Add a new Dog Park</Link>
        </div>
    )
}

export default DogParksList
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
            <div className="callout dog-parks-list-item left-margin right-margin">
                <Link className="list-link" to={`/parks/${park.id}`}> {`${park.name}`}</Link>
                <p>{park.address}</p>
            </div>
        )
    })
    
    return (
        <div>
            <div className="dog-parks-index">
                <h3 className="center-text form-header-text">Dog Parks of Boston</h3>
                <div className="grid-x">
                    <div className="dog-parks-list cell small-6">
                        {parksList.slice(0, Math.ceil(parksList.length / 2))}
                    </div>
                    <div className="dog-parks-list cell small-6">
                        {parksList.slice(Math.ceil(parksList.length / 2))}
                    </div>
                </div>
                <div className="center-text">
                    <Link className="add-park-link" to="/parks/new">Add a new Dog Park</Link>
            </div>
                </div>
        </div>
    )
}

export default DogParksList
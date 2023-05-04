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
        return <p>{tag}</p>
    })

    useEffect(() => {
        getPark()
    }, [])

    return (
        <>
            <h1>{park.name}</h1>
            <p>{park.address}</p>
            <p>{park.description}</p>
                {parkTags}   
            <p>Last Updated: {park.updatedAt}</p>    
        </>
    )
}

export default DogParkShow
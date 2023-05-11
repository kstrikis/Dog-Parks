import React, { useEffect, useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"

const EditDogParkForm = props => {
    const parkId = props.match.params.id

    const defaultDogPark = {
        name: "",
        description: "",
        address: "",
        neighborhood: "",
        hasTrash: false,
        hasBags: false,
        hasFence: false,
        hasWater: false,
        hasBenches: false
    }
    
    const [editedDogPark, setEditedDogPark] = useState(defaultDogPark)
    const [errors, setErrors] = useState([])
    const [shouldRedirectShow, setShouldRedirectShow] = useState(false)

    const getExistingParkData = async (parkId) => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}/edit`)
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setEditedDogPark(body.park)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getExistingParkData(parkId)
    }, [])

    const patchEditedDogPark = async () => {
        try {
            const response = await fetch(`/api/v1/parks/${parkId}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {park: editedDogPark} )
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
            } else {
                setShouldRedirectShow(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }
    
    const handleInputChange = event => {
        if(event.currentTarget.type === "checkbox"){
            setEditedDogPark({
                ...editedDogPark,
                [event.currentTarget.name]: event.currentTarget.checked
            })
        }
        if(event.currentTarget.type === "text"){
            setEditedDogPark({
                ...editedDogPark,
                [event.currentTarget.name]: event.currentTarget.value
            })
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        patchEditedDogPark()
    }

    if(shouldRedirectShow) {
        return <Redirect push to={`/parks/${parkId}`} />
    }

    return (
        <div className="new-park-form">
            <h1 className="new-park-header">Edit a Dog Park</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <label className="dark-text bold-text">
                    Name
                    <input
                        className="form-field-input"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={editedDogPark.name}
                    />
                </label> 
                <label className="dark-text bold-text">
                    Address
                    <input
                        className="form-field-input"
                        type="text"
                        name="address"
                        onChange={handleInputChange}
                        value={editedDogPark.address}
                    />
                </label>
                <label className="dark-text bold-text">
                    Description
                    <input
                        className="form-field-input"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={editedDogPark.description}
                    />
                </label>
                <label className="dark-text bold-text">
                    Neighborhood
                    <input
                        className="form-field-input"
                        type="text"
                        name="neighborhood"
                        onChange={handleInputChange}
                        value={editedDogPark.neighborhood}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has trash cans
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasTrash"
                        onChange={handleInputChange}
                        checked={editedDogPark.hasTrash}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has pickup bags
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasBags"
                        onChange={handleInputChange}
                        checked={editedDogPark.hasBags}
                    />
                </label>
                <label className="dark-text bold-text">
                    Is fenced
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasFence"
                        onChange={handleInputChange}
                        checked={editedDogPark.hasFence}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has water fountains
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasWater"
                        onChange={handleInputChange}
                        checked={editedDogPark.hasWater}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has benches
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasBenches"
                        onChange={handleInputChange}
                        checked={editedDogPark.hasBenches}
                    />
                </label>
                <input className="form-button-dark" type="submit" value="Submit Changes" />

            </form>
        </div>
    )
}
export default EditDogParkForm
import React, { useState } from "react"
import translateServerErrors from "../services/translateServerErrors"
import ErrorList from "./layout/ErrorList"
import { Redirect } from "react-router-dom"

const NewDogParkForm = props => {

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
    
    const [newDogPark, setNewDogPark] = useState(defaultDogPark)
    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postNewDogPark = async () => {
        try {
            const response = await fetch("/api/v1/parks", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify( {park: newDogPark} )
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
                setShouldRedirect(true)
            }
        } catch(err) {
            console.error("Error in fetch", err.message)
        }
    }
    
    const handleInputChange = event => {
        if(event.currentTarget.type === "checkbox"){
            setNewDogPark({
                ...newDogPark,
                [event.currentTarget.name]: event.currentTarget.checked
            })
        }
        if(event.currentTarget.type === "text"){
            setNewDogPark({
                ...newDogPark,
                [event.currentTarget.name]: event.currentTarget.value
            })
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        postNewDogPark()
    }

    if(shouldRedirect) {
        return <Redirect push to="/" />
    }

    return (
        <div className="new-park-form">
            <h1 className="new-park-header">Add a New Dog Park</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit} >
                <label className="dark-text bold-text">
                    Name
                    <input
                        className="form-field-input"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={newDogPark.name}
                    />
                </label> 
                <label className="dark-text bold-text">
                    Address
                    <input
                        className="form-field-input"
                        type="text"
                        name="address"
                        onChange={handleInputChange}
                        value={newDogPark.address}
                    />
                </label>
                <label className="dark-text bold-text">
                    Description
                    <input
                        className="form-field-input"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={newDogPark.description}
                    />
                </label>
                <label className="dark-text bold-text">
                    Neighborhood
                    <input
                        className="form-field-input"
                        type="text"
                        name="neighborhood"
                        onChange={handleInputChange}
                        value={newDogPark.neighborhood}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has trash cans
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasTrash"
                        onChange={handleInputChange}
                        checked={newDogPark.hasTrash}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has pickup bags
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasBags"
                        onChange={handleInputChange}
                        value={newDogPark.hasBags}
                    />
                </label>
                <label className="dark-text bold-text">
                    Is fenced
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasFence"
                        onChange={handleInputChange}
                        value={newDogPark.hasFence}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has water fountains
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasWater"
                        onChange={handleInputChange}
                        value={newDogPark.hasWater}
                    />
                </label>
                <label className="dark-text bold-text">
                    Has benches
                    <input
                        className="left-margin"
                        type="checkbox"
                        name="hasBenches"
                        onChange={handleInputChange}
                        value={newDogPark.hasBenches}
                    />
                </label>
                <input className="form-button-dark" type="submit" value="Submit" />

            </form>
        </div>
    )
}
export default NewDogParkForm
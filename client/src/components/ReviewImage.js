import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone"

const ReviewImage = (props) => {
    const [image, setImage] = useState(null)
    const [newImageFormData, setNewImageFormData] = useState({
        image: {}
    })

    const getImage = async () => {
        try {
            const response = await fetch("/api/v1/reviews/image")
            if (!response.ok) {
                throw new Error (`${response.status} (${response.statusText})`)
            }
            const body = await response.json()
            setImage(body.image)
        } catch (error) {
            console.error(`Error in photos Fetch: ${error.message}`)
        }
    }

        useEffect(() => {
            getImage()
        }, [])

        const handleImageUpload = (acceptedImage) => {
            setNewImageFormData({
                ...newImageFormData, image:acceptedImage[0]
            })
        }
        const addImage = async (event) => {
            event.preventDefault()
            const newImageBody = new FormData()
            console.log(newImageBody)
            newImageBody.append("image", newImageFormData.image)
            try {
                const response = await fetch("/api/v1/reviews/image", {
                    method: "POST",
                    headers: {
                        "Accept": "image/jpeg"
                    },
                    body: newImageBody
                })
                if (!response.ok) {
                    throw new Error(`${response.status} (${response.statusText})`)
                }
                const body = await response.json()
                setImage(body.image)
            } catch (error) {
                console.error(`Error in photos Fetch: ${error.message}`)
            }
        }

    return (
        <div>
            <div>
                <img src={image} />
            </div>
        
        <form onSubmit={addImage}>
            <Dropzone onDrop={handleImageUpload}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Add an Image to your Review - drag 'n' drop or click to upload</p>
                        </div>
                    </section>
                )} 
            </Dropzone>
        </form>
        </div>
    )
}

export default ReviewImage
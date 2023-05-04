class DogParksSerializer {

    static showDetailsForList(dogParksArray) {
        const newParks = dogParksArray.map(park => {
            return {
                id: park.id,
                name: park.name,
                address: park.address
            }
        })
        return newParks
    }

    static detailsForShow(dogPark) {
        const allowedAttributes = ["id", "name", "address", "description", "updatedAt"]

        let newPark = {}
        newPark.tags = []
        for (const attribute of allowedAttributes) {
            newPark[attribute] = dogPark[attribute]
        }

        if (dogPark.hasTrash) {
            newPark.tags.push("Trash Cans")
        }
        if (dogPark.hasBenches) {
            newPark.tags.push("Benches")
        }
        if (dogPark.hasWater) {
            newPark.tags.push("Water Fountains")
        }
        if (dogPark.hasFence) {
            newPark.tags.push("Fencing")
        }
        if (dogPark.hasBags) {
            newPark.tags.push("Doggie Bags")
        }

        return newPark
    }
}   

export default DogParksSerializer
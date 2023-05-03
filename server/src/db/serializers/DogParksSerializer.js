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
}

export default DogParksSerializer
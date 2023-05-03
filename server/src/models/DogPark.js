const Model = require("./Model.js")

class DogPark extends Model {
    static get tableName() {
        return ("dogParks")
    }

    static get jsonSchema() {
        return ({
            type: "object",
            required: ["name", "description", "address"],
            properties: {
                name: {type: "string"},
                description: {type: "string", minLength: 20 },
                address: {type: "string"},
                neighborhood: {type: "string"},
                hasTrash: {type: "boolean"},
                hasBags: {type: "boolean"},
                hasFence: {type: "boolean"},
                hasWater: {type: "boolean"},
                hasBenches: {type: "boolean"}
            }
        })
    }
}

module.exports = DogPark
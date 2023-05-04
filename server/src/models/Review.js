const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["reviewText", "rating", "dogParkId", "userId"],
            properties: {
                reviewText: {type: "string", minLength: 20},
                rating: {type: ["integer", "string"]},
                dogParkId: {type: ["integer", "string"]},
                userId: {type: ["integer", "string"]}
            }
        }
    }

    static get relationMappings() {
        const {User, DogPark} = require("./index.js") 
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },

            dogPark: {
                relation: Model.BelongsToOneRelation,
                modelClass: DogPark,
                join: {
                    from: "reviews.dogParkId",
                    to: "dogParks.id"
                }
            }
        }
    }
}

module.exports = Review
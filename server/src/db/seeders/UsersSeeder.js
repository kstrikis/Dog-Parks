import { User } from "../../models/index.js"

class UsersSeeder {
    static async seed()
    {
        const users = [{
            email: "user@example.com",
            userName: "User 1",
            city: "Boston",
            cryptedPassword: "$2b$10$F4RveUKzfarwWBZ2lpLUFeZolicDTUcNyv3h47L0R5n9s14UBHVXe",
        },
        {
            email: "hilary@example.com",
            userName: "Hilary",
            city: "South Boston",
            cryptedPassword: "$2b$10$carqr68sTvVNRCCeJYFcHOk98BjDL2w9fXuvoLzGOFE7fbb.U1A5a",
        },
        {
            email: "kriss@example.com",
            userName: "Kriss",
            city: "Cambridge",
            cryptedPassword: "$2b$10$vU6IjOelV625TTLJ9nGLoOCPGMp7aTiSLk0Jn3IuYkeRxclfFSRXm",
        },
        {
            email:"admin@example.com",
            userName: "Admin",
            city: "Boston",
            cryptedPassword: "$2b$10$/e2w4cfvcaWg9AFwQ5ouHOK/2.wvtmV1XOhzY/xZRJ5DCmu4cS63G",
            isAdmin: true
        },
        {
            email:"googleAPI@example.com",
            userName: "Review From Google Maps",
            cryptedPassword: "$2b$10$ufXaJnvmEaYp4pqCTnFcwO8oKqSEpKnMsTSvBUwDzW5NrStp6Koey",
            isAdmin: false
        }]
        for (const user of users) {
            const inDB = await User.query().findOne( {userName: user.userName} )
            if (!inDB) {
                await User.query().insert(user)
            }
        }
    }
}

export default UsersSeeder
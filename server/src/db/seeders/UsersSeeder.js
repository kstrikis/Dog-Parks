import { User } from "../../models/index.js"

class UsersSeeder {
    static async seed()
    {
        const users = [{
            email: "user@example.com",
            userName: "user1",
            city: "Boston",
            cryptedPassword: "$2b$10$5kzjcb2R/OwrvyQv.ZxumewkWmQFf0NBFsKoy0hhQ5SWUpOurRWba",
        },
        {
            email: "hilary@example.com",
            userName: "hilary",
            city: "Boston",
            cryptedPassword: "$2b$10$KtL2zMLDVGmsWnJz45WvyefP2vRUnyUUAIxh8zjk.DNAMOEs9gbr.",
        },
        {
            email: "kriss@example.com",
            userName: "kriss",
            city: "Cambridge",
            cryptedPassword: "$2b$10$NMZ0xvCY36bUiK1iARY4duS0QsdJ4hnzgn.KYb3xz8ge.IaBow8li",
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
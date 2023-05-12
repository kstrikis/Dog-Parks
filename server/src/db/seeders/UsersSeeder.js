import { User } from "../../models/index.js"

class UsersSeeder {
    static async seed()
    {
        const users = [{
            email: "user@example.com",
            userName: "User 1",
            city: "Boston",
            cryptedPassword: "$2b$10$5kzjcb2R/OwrvyQv.ZxumewkWmQFf0NBFsKoy0hhQ5SWUpOurRWba",
        },
        {
            email: "hilary@example.com",
            userName: "Hilary",
            city: "South Boston",
            cryptedPassword: "$2b$10$KtL2zMLDVGmsWnJz45WvyefP2vRUnyUUAIxh8zjk.DNAMOEs9gbr.",
        },
        {
            email: "kriss@example.com",
            userName: "Kriss",
            city: "Cambridge",
            cryptedPassword: "$2b$10$NMZ0xvCY36bUiK1iARY4duS0QsdJ4hnzgn.KYb3xz8ge.IaBow8li",
        },
        {
            email:"admin@example.com",
            userName: "Admin",
            city: "Boston",
            cryptedPassword: "$2b$10$dTI6XoH6Q28hjl3AlaoOmOlo/Gcln0/Bstae.HYMG1mBSrmKU.c/a",
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
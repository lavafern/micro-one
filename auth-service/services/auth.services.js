const db = require('../models/index')

module.exports = {
    register(email,password,name) {
        return db.User.create({
            email : email,
            password : password,
            isVerivied : false,
            profile: {
                name : name,
                role : role
            }
        })
    },
    login() {

    },
    hashPassword(rawPassword) {

    },
    logout() {

    }
}

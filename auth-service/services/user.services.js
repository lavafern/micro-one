const db = require('../models/index')

module.exports = {
    findById(id) {

    },
    findAll() {

    },
    update(id) {

    },
    findByEmail(email) {
        return db.User.findOne({
            where : {
                email
            },
            include: 'profile'
        })
    },
    authenticate() {
        
    }
}

const {sequilize,Sequelize} = require('./connection')
const User = require('./user')
const Profile = require('./profile')


const db = {}

db.Sequelize = Sequelize
db.sequilize = sequilize
db.User = User
db.Profile = Profile

db.User.hasOne(db.Profile)

db.Profile.belongsTo(db.User)


module.exports = db


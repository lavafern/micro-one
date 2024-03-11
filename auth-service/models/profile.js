const {sequilize,DataTypes} = require('./connection')

const Profile = sequilize.define('profile', {
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role : {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Profile
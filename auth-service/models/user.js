const {sequilize,DataTypes} = require('./connection')

const User = sequilize.define('user', {
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})


module.exports = User
'use strict'

const bcrypt = require('bcryptjs')

const Users = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })

  user.beforeCreate( async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword;
    return user.password
  })

  return user
}



module.exports = Users

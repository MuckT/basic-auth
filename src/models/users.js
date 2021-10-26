'use strict'

const bcrypt = require('bcryptjs')

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
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

  model.beforeCreate( async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword;
    return user.password
  })

  return model
}

module.exports = userModel

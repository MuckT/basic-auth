'use strict'

require('dotenv').config()

// Connect to database
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' : process.env.DATABASE_URL
const { Sequelize, DataTypes } = require('sequelize')
const userSchema = require('./users')
let sequelizeOptions = process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    }
    : {};
let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
}

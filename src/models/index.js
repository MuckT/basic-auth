'use strict'

require('dotenv').config()

// Connect to database
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' : process.env.DATABASE_URL
const { Sequelize, DataTypes } = require('sequelize')
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
const users = require('./users')

module.exports = {
  db: sequelize,
  Users: users(sequelize, DataTypes),
}

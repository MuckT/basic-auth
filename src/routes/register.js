'use strict'

const express = require('express')
const bcrypt = require('bcryptjs')

const { Users } = require('../models/index')

const router = express.Router()

router.post('/register', registerUser)

async function registerUser(req, res) {
  try {
    const record = await Users.create(req.body)
    res.status(200).json(record);
  } catch (error) { 
    res.status(403).send('Error Creating User')
    console.error('Register: ', error)
  }
}

module.exports = router

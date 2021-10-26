'use strict'

const express = require('express')
const bcrypt = require('bcryptjs')

const { users } = require('../models/index')

const router = express.Router()

router.post('/register', registerUser)

async function registerUser(req, res) {
  try {
    const record = await users.create(req.body)
    res.status(200).json(record);
  } catch (error) { 
    res.status(403).send('Error Creating User')
    console.error('Register: ', error)
  }
}

module.exports = router

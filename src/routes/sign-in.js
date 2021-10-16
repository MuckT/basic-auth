'use strict'

const express = require('express')
const bcrypt = require('bcryptjs')
const base64 = require('base-64')

const decoding = require('../middleware/decoding')


const { Users } = require('../models/index')

const router = express.Router()

router.post('/sign-in', decoding, signIn)

async function signIn(req, res) {
  try {
    const user = await Users.findOne({ where: { username: req.body.username } })
    const valid = await bcrypt.compare(req.body.password, user.dataValues.password)
    if (valid) {
      res.status(200).json(user)
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { 
    res.status(403).send("Invalid Login")
    console.error('Sign-in: ', error)
  }
}

module.exports = router
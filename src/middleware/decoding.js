'use strict'

const base64 = require('base-64')

async function decoding(req, res, next) {
  try {
    let basicHeaderParts = req.headers.authorization.split(' ')
    let encodedString = basicHeaderParts.pop()
    let decodedString = base64.decode(encodedString)
    let [username, password] = decodedString.split(':')
    req.body.username = username
    req.body.password = password
  } catch(error) {
    console.error('decoding: ', error)
  } finally {
    next()
  }
}

module.exports = decoding
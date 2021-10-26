'use strict'

const supertest = require('supertest')
const { db } = require('../models/index')
const { server } = require('../server')
const mockRequest = supertest(server)

beforeAll(async() => {
  await db.sync()
})

afterAll(async() => {
  await db.drop()
})

describe('Given POST', () => {
  describe("When '/register'", () => {
    it('Then is able to register a user with valid body', async () => {
      const request = {
        username: 'Jayson.Deckow77@test.com',
        password: 'password'
      }

      const response = await mockRequest.post('/register').send(request)
      expect(response.body.id).toEqual(expect.any(Number))
      expect(response.body.username).toStrictEqual('Jayson.Deckow77@test.com')
      expect(response.body.password).toEqual(expect.any(String))
    })
  })
})
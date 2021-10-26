'use strict'

const supertest = require('supertest')
const { db, users } = require('../models/index')
const { server } = require('../server')
const mockRequest = supertest(server)

beforeAll(async() => {
  await db.sync()
  await users.bulkCreate([
    {
      id: 0,
      username: 'Jayson.Deckow77@test.com',
      password: '$2a$10$3cKT1o6gUqMKoPNggJyTce7Algx36J3U9fCt7IbsYEPdEFM.Wns/i',
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    }
  ])
})

afterAll(async() => {
  await db.drop()
})

describe('Given POST', () => {
  describe("When '/sign-in'", () => {
    it('Then is able to sign in with valid user', async () => {
      const response = await mockRequest.post('/sign-in').set('Authorization', `Basic SmF5c29uLkRlY2tvdzc3QHRlc3QuY29tOnBhc3N3b3Jk`)
      expect(response.body).toStrictEqual(
        {
          id: 0,
          username: 'Jayson.Deckow77@test.com',
          password: '$2a$10$3cKT1o6gUqMKoPNggJyTce7Algx36J3U9fCt7IbsYEPdEFM.Wns/i',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        }
  
      )
    })

    it('Then is not able to sign in with invalid user', async () => {
      const response = await mockRequest.post('/sign-in').set('Authorization', 'Basic SmF5c29uLkRlY2tvdzc3QHRlc3QuY29tOmZha2VwYXNzd29yZA==')
      expect(response.status).toStrictEqual(403)
      expect(response.text).toStrictEqual('Invalid Login')
    })
  })
})

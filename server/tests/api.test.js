const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper.js')
const Coffee = require('../models/coffee')
const User = require('../models/user')

jest.useFakeTimers();

describe('when there are initially coffees saved', function() {
  beforeEach(async () => {
    await Coffee.deleteMany({})

    const coffeeObjects = helper.initialCoffees
      .map(coffee => new Coffee(coffee))
    const promiseArray = coffeeObjects.map(coffee => coffee.save())
    await Promise.all(promiseArray)
  })

  test('coffees are returned as json', async () => {
    await api
      .get('/api/coffees')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 30000)

  test('all coffees are returned', async () => {
    const response = await api.get('/api/coffees')

    expect(response.body.length).toBe(helper.initialCoffees.length)
  })

  test('a specific coffee is within the returned coffees', async () => {
    const response = await api.get('/api/coffees')

    const names = response.body.map(r => r.coffeeName)
    expect(names).toContain('Good blend')
  })
})

describe('viewing a specific coffee', () => {
  test('succeeds with a valid id', async () => {
    const coffeesAtStart = await helper.coffeesInDb()

    const coffeeToView = coffeesAtStart[0]

    const resultCoffee = await api
      .get(`/api/coffees/${coffeeToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultCoffee.body.coffeeName).toEqual(coffeeToView.coffeeName)
  })
})


describe('when logged in', () => {
  beforeEach(() => {
    User.deleteMany({})
  })

  let token = ''

  beforeAll((done) => {
    User.deleteMany({})
    api
      .post('/api/users')
      .send({ username: 'jimbo', email: 'hi@gmail.com', password: 'password' })
      .expect(200)
      .end((err, res) => {
        token = res.body.token
        console.log(token)
        done()
      })
  },30000)

  test('one', () => {
    expect(1).toEqual(1)
  }, 30000)
})

afterAll((done) => {
  mongoose.connection.close()
  done()
})
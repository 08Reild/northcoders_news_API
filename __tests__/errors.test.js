const { app } = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
// require("jest-sorted")
const db = require("../db/connection")
// const endpoints = require('../endpoints.json');

beforeEach( () => {
    return seed(data)
})

afterAll(() => {db.end()})

describe("Invalid paths", () => {
    test("Returns 404 Not Found when an invalid path is given", () => {
        return request(app)
        .get("/api/not_valid")
        .expect(404)
        .then( ( {body} ) => {
            expect(body.msg).toBe("Not Found")
        })
    })
})
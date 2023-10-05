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
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })
    test("Requesting articles with an article_id that does not exist returns 404 Not Found", () => {
        return request(app)
        .get('/api/articles/819461')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not Found")
        })
    })
    test("Requesting articles with a non numeric value instead of a article_id number returns 400 bad request", () => {
        return request(app)
        .get('/api/articles/invalidrequest')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    })
    // test("Requesting an invalid endpoint returns 404 not Found", () => {
    //     return request(app)
    //     .get('/api/articl3s')
    //     .expect(404)
    //     .then(({body}) => {
    //         expect(body.msg).toBe("Not Found")
    //     })
    // })
})
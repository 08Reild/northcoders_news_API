const { app } = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
// require("jest-sorted")
const db = require("../db/connection")
// const endpoints = require('../endpoints.json');

beforeEach(() => {
    return seed(data)
})

afterAll(() => { db.end() })

describe("Invalid get requests", () => {
    test("Returns 404 Not Found when an invalid path is given", () => {
        return request(app)
            .get("/api/not_valid")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Not Found")
            })
    })
    test("Requesting articles with an article_id that does not exist returns 404 Not Found", () => {
        return request(app)
            .get('/api/articles/819461')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Not Found")
            })
    })
    test("Requesting articles with a non numeric value instead of a article_id number returns 400 bad request", () => {
        return request(app)
            .get('/api/articles/invalidrequest')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
    })
    test("Returns 404 Not Found if the requested articles_id does not exist", () => {
        return request(app)
            .get('/api/articles/973742/comments')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Not Found")
            })
    })
    test("Requesting article comments with a non numeric value instead of a article_id number returns 400 bad request", () => {
        return request(app)
            .get('/api/articles/invalidrequest/comments')
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
    })

})

describe("invalid posts", () => {
    test("posting a comment without a body returns 400 bad request", () => {
        const commentWithoutBody = {
            "username": "testuser"
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(commentWithoutBody)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
    })

    test("posting a comment without username returns 400 bad request", () => {
        const commentWithoutUsername = {
            "body": "This is a test comment"
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(commentWithoutUsername)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            })
    })
})


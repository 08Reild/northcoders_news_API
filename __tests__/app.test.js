
const { app } = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
// require("jest-sorted")
const db = require("../db/connection")

beforeEach( () => {
    return seed(data)
})

afterAll(() => {db.end()})

describe("/api/topics", () => {
    test("Checks the request returns status 200 and an array of all topics with slug and description properties", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            const firstObjInTopics = { slug: 'mitch', description: 'The man, the Mitch, the legend' }
            expect(body.topics.length).toBe(3)
            expect(body.topics[0]).toMatchObject(firstObjInTopics)    
            expect(body.topics[0]).toHaveProperty('slug');
            expect(body.topics[0]).toHaveProperty('description');
            })
        })
})

describe.only("Invalid paths", () => {
    test("Returns 404 Not Found when an invalid path is given", () => {
        return request(app)
        .get("/api/not_valid")
        .expect(404)
        .then( ( {body} ) => {
            expect(body.msg).toBe("Not Found")
        })
    })
})
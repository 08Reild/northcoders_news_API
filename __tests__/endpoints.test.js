const { app } = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
// require("jest-sorted")
const db = require("../db/connection")
const endpoints = require('../endpoints.json');

beforeEach(() => {
    return seed(data)
})

afterAll(() => { db.end() })

describe("These tests check the endpoints.json file contains descriptions, queries, example response and the required body format (all where required)", () => {
    test("GET /api", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual(expect.any(Object));
                expect(body).toHaveProperty("endpoints");
                Object.keys(body.endpoints).forEach((endpoint) => {
                    expect(body.endpoints[endpoint]).toHaveProperty("description");
                });
                expect(body.endpoints).toEqual(endpoints);
            });
    })
})

const { app } = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
// require("jest-sorted")
const db = require("../db/connection")
const endpoints = require('../endpoints.json');
const articles = require("../db/data/test-data/articles")

beforeEach(() => {
    return seed(data)
})

afterAll(() => { db.end() })

describe("/api/topics", () => {
    test("Checks the request returns status 200 and an array of all topics with slug and description properties", () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                const firstObjInTopics = { slug: 'mitch', description: 'The man, the Mitch, the legend' }
                expect(body.topics.length).toBe(3)
                expect(body.topics[0]).toMatchObject(firstObjInTopics)
                expect(body.topics[0]).toHaveProperty('slug');
                expect(body.topics[0]).toHaveProperty('description');
            })
    })
})

describe('/api', () => {
    test('GET /api should return a description of all endpoints', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({ body }) => {
                expect(body.endpoints).toEqual(endpoints);
            });
    });
});

describe('/api/articles/:article_id', () => {
    test('GET /api/articles/:article_id should return an article by its id', () => {
        const article_id = 1; 
        return request(app)
            .get(`/api/articles/${article_id}`)
            .expect(200)
            .then(({ body }) => {
                const article = body.article;
                expect(article).toHaveProperty('author')
                expect(article).toHaveProperty('title')
                expect(article).toHaveProperty('article_id')
                expect(article).toHaveProperty('body')
                expect(article).toHaveProperty('topic')
                expect(article).toHaveProperty('created_at')
                expect(article).toHaveProperty('votes')
                expect(article).toHaveProperty('article_img_url')
            });
    });
});
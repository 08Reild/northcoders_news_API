
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

describe("/api/topics", () => {
    test("Checks the request returns status 200 and an array of all topics with slug and description properties", () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                const firstObjInTopics = { slug: 'mitch', description: 'The man, the Mitch, the legend' }
                expect(body.topics.length).toBe(3)
                expect(body.topics[0]).toMatchObject(firstObjInTopics)
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
                expect(body.article).toMatchObject({
                    article_id: 1,
                    title: expect.any(String),
                    author: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    body: expect.any(String)
                })
            })
            ;
    });
});

describe('/api/articles', () => {
    test('GET /api/articles should return all articles', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                body.articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        author: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    });
                });
            });
    });
});

describe('/api/articles', () => {
    test('GET /api/articles returns the comment_count as a number', () => {
        return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                body.articles.forEach((article) => {
                    expect(article).toMatchObject({
                        comment_count: expect.any(Number)
                    });
                });
            });
    });
});

describe('/api/articles/:article_id/comments', () => {
    test('Checks the request returns all comments for a given article_id', () => {
        const article_id = 1
        return request(app)
            .get(`/api/articles/${article_id}/comments`)
            .expect(200)
            .then(({ body }) => {
                expect(body.comments[0]).toMatchObject({
                    article_id: expect.any(Number),
                    comment_id: expect.any(Number),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                });
            });
    });  
    test('Checks request to an article_id with no comments should return an empty array', () => {
        const article_id = 2
        return request(app)
            .get(`/api/articles/${article_id}/comments`)
            .expect(200)
            .then(({ body }) => {
                expect(body.comments).toEqual([]);
            })
    })
})
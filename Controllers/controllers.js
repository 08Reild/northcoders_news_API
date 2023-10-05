const {fetchTopics, fetchArticlesById, fetchAllArticles } = require("../Models/models")
const endpoints = require('../endpoints.json');

function getTopics (req, res, next) {
    const requestPath = req.params.endpoint
    return fetchTopics(requestPath)
    .then((result) => {
        res.status(200).send({topics: result})
    })
    .catch((err) => {
        next(err)
    })
}

function getEndpoints (req, res, next) {
    res.status(200).send({endpoints: endpoints})

}

function getArticlesById (req, res, next) {
    const article_id = req.params.article_id;
    return fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).send({ article: article });
    })
    .catch((err) => {
        next(err);
    });
}

function getAllArticles (req, res, next) {
    return fetchAllArticles()
    .then((articles) => {
        res.status(200).send({articles: articles})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = {getTopics, getEndpoints, getArticlesById, getAllArticles }

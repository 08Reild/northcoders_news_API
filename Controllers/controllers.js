const {fetchTopics, fetchArticlesById, fetchAllArticles, fetchArticlesComments } = require("../Models/models")
const endpoints = require('../endpoints.json');

function getTopics (req, res, next) {
    return fetchTopics()
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

function getArticlesComments (req, res, next) {
    const article_id = req.params.article_id
    return fetchArticlesComments(article_id)
    .then((comments) => {
        res.status(200).send({comments: comments})
    })
    .catch((err) => {
        //console.log(err, "I'm the error in the getArticlesComment function in the controller")
        next(err)
    })
}

module.exports = {getTopics, getEndpoints, getArticlesById, getAllArticles, getArticlesComments }

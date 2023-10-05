const {fetchTopics, fetchArticlesById} = require("../Models/models")
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
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err);
    });
}


module.exports = {getTopics, getEndpoints, getArticlesById}

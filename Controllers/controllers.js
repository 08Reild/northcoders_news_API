const {fetchTopics, fetchEndpoints} = require("../Models/models")
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


module.exports = {getTopics, getEndpoints}
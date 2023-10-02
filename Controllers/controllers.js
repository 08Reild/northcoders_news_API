const {fetchTopics} = require("../Models/models")

function getTopics (req, res, next) {
    return fetchTopics()
    .then((result) => {
        res.status(200).send({topics: result})
    })
    .catch((err) => next(err))
}

module.exports = {getTopics}
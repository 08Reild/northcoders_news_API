const db = require('../db/connection')
const fs = require('fs/promises');

// const format = require('pg-format')

function fetchTopics(requestPath) {
    if (requestPath === "topics") {
        return db.query(`SELECT * FROM topics`).then((result) => {
            return result.rows
        })
    } else {
        return Promise.reject({
            status: 404,
            message: 'Not Found'
            })
    }
}

module.exports = { fetchTopics }
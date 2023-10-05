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

function fetchArticlesById (article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'Not Found'
                })
            } 
            return result.rows[0];
        })
}

function fetchAllArticles () {
        return db.query(`SELECT * FROM articles`)
        .then((result) => {
            return result
        })
    }
    
    // else {
    //     return Promise.reject({
    //         status: 404,
    //         message: 'Not Found'
    //         })
    // }

module.exports = { fetchTopics, fetchArticlesById, fetchAllArticles}
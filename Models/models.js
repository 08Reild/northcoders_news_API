const db = require('../db/connection')
const fs = require('fs/promises');

// const format = require('pg-format')

function fetchTopics(requestPath) {
    if (requestPath === "topics") {
        return db.query(`SELECT * FROM topics`)
        .then((result) => {
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
    return db.query(`
        SELECT * 
        FROM articles 
        WHERE article_id = $1
        `, [article_id])
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
        return db.query(`
        SELECT 
        articles.article_id,
        articles.title,
        articles.author,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) 
        AS comment_count
        FROM articles
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
    `)
        .then((result) => {
            return result.rows
        })
    }
    
    // else {
    //     return Promise.reject({
    //         status: 404,
    //         message: 'Not Found'
    //         })
    // }

module.exports = { fetchTopics, fetchArticlesById, fetchAllArticles}


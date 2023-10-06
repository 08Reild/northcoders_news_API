const db = require('../db/connection')
const fs = require('fs/promises');

// const format = require('pg-format')

function fetchTopics() {
    return db.query(`SELECT * FROM topics`)
        .then((result) => {
            return result.rows
        })
}

function fetchArticlesById(article_id) {
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

function fetchAllArticles() {
    return db.query(`
        SELECT 
        articles.article_id,
        articles.title,
        articles.author,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) :: INT
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

function fetchArticlesComments(article_id) {
    return db.query(`
        SELECT 
        comments.comment_id,
        comments.votes,
        comments.created_at,
        comments.author,
        comments.body,
        comments.article_id,
        COUNT(*) 
        AS comment_count
        FROM comments
        WHERE comments.article_id = $1
        GROUP BY comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id
        ORDER BY comments.created_at DESC;`
        , [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'Not Found'
                })
            }
            return result.rows
        })
}

function insertComment(article_id, username, body) {
    return db.query(`
    INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [article_id, username, body])
        .then((result) => {
            return result.rows[0]
        })
}

module.exports = { fetchTopics, fetchArticlesById, fetchAllArticles, fetchArticlesComments, insertComment }


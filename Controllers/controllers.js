const {
    fetchTopics,
    fetchArticlesById,
    fetchAllArticles,
    fetchArticlesComments,
    insertComment,
    changeArticleVotes,
    deleteCommentById
} = require("../Models/models")
const endpoints = require('../endpoints.json');

function getTopics(req, res, next) {
    return fetchTopics()
        .then((result) => {
            res.status(200).send({ topics: result })
        })
        .catch((err) => {
            next(err)
        })
}

function getEndpoints(req, res, next) {
    res.status(200).send({ endpoints: endpoints })
}

function getArticlesById(req, res, next) {
    const article_id = req.params.article_id;
    return fetchArticlesById(article_id)
        .then((article) => {
            res.status(200).send({ article: article });
        })
        .catch((err) => {
            next(err);
        });
}

function getAllArticles(req, res, next) {
    return fetchAllArticles()
        .then((articles) => {
            res.status(200).send({ articles: articles })
        })
        .catch((err) => {
            next(err)
        })
}

function getArticlesComments(req, res, next) {
    const article_id = req.params.article_id
    fetchArticlesById(article_id).then((result) => {
        return fetchArticlesComments(article_id)
            .then((comments) => {
                res.status(200).send({ comments: comments })
            })
    })
        .catch((err) => {
            next(err)
        })
}

function postComment(req, res, next) {
    const username = req.body.username;
    const body = req.body.body;
    const article_id = req.params.article_id;
    fetchArticlesById(article_id)
        .then((result) => {
            if (!username || !body) {
                return res.status(400).send({ msg: "Bad Request" });
            } else {
                return insertComment(article_id, username, body)
                    .then((result) => {
                        res.status(201).send({ msg: result });
                    })
            }
        })
        .catch((err) => {
                next(err);
        });
}

function updateArticleVotes(req, res, next) {
    const article_id = req.params.article_id
    const inc_votes = req.body.inc_votes
    fetchArticlesById(article_id).then((result) => {
    return changeArticleVotes(article_id, inc_votes)
    .then((result) => {
        res.status(200).send({msg: result})
    })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

function deleteComment(req, res, next) {
    const comment_id = req.params.comment_id;
    deleteCommentById(comment_id).then((result) => {
            res.sendStatus(204)
        })
        .catch((err) => {
            next(err);
        });
}


module.exports = {
    getTopics,
    getEndpoints,
    getArticlesById,
    getAllArticles,
    getArticlesComments,
    postComment,
    updateArticleVotes,
    deleteComment
}

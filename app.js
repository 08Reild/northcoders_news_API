const express = require('express')
const bodyParser = require('body-parser')
const { 
    getTopics, 
    getEndpoints, 
    getArticlesById, 
    getAllArticles, 
    getArticlesComments,
    postComment,
    updateArticleVotes
} = require('./Controllers/controllers')
const { 
    handleCustomErrors, 
    handlePSQLErrors, 
    handle500Errors 
} = require('./Errors/index.js')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', getEndpoints);

app.get('/api/articles', getAllArticles);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getArticlesComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", updateArticleVotes)

app.all('/api/*', (req, res) => {
    return res.status(404).send({ msg: "Not Found" })
})

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = { app }
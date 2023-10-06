const express = require('express')
const { getTopics, getEndpoints, getArticlesById, getAllArticles, getArticlesComments } = require('./Controllers/controllers')
const { handleCustomErrors, handlePSQLErrors, handle500Errors} = require('./Errors/index.js')
const app = express()

app.get('/api', getEndpoints);

app.get('/api/articles', getAllArticles);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getArticlesComments)

app.all('/api/*', (req, res) => {
  return res.status(404).send({ msg: "Not Found"})
})

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = { app }
const express = require('express')
const { getTopics, getEndpoints, getArticlesById, getAllArticles } = require('./Controllers/controllers')
const { handleCustomErrors, handlePSQLErrors, handle500Errors } = require('./Errors/index.js')
const app = express()

app.get('/api', getEndpoints);

app.get('/api/articles', getAllArticles);

app.get("/api/:endpoint", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = { app }
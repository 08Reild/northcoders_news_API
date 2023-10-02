const express = require('express')
const {getTopics} =  require('./Controllers/controllers')

const app = express()

app.get("/api/topics", getTopics)


//Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

module.exports = { app }
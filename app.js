const express = require('express')
const {getTopics} =  require('./Controllers/controllers')
const { handleCustomErrors } = require('./Errors/index.js')
const app = express()

app.get("/api/:endpoint", getTopics)


// Error Handling Middleware
// app.use((err, req, res, next) => {
//     res.status(500).send('Something went wrong!');
// });

app.use(handleCustomErrors)

module.exports = { app }
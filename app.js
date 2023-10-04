const express = require('express')
const {getTopics, getEndpoints} =  require('./Controllers/controllers')
const { handleCustomErrors } = require('./Errors/index.js')
const app = express()

app.get('/api', getEndpoints);

app.get("/api/:endpoint", getTopics)




// Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.log(err, "This is an error in app.j EHM")
//     res.status(500).send('Internal Server Error - Something went wrong!');
// });

app.use(handleCustomErrors)

module.exports = { app }
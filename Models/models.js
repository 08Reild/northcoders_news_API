const db = require('../db/connection')
// const format = require('pg-format')

function fetchTopics() {
    return db.query(`SELECT * FROM topics`)
    .then((result) => {  
        return result.rows 
    })
}

module.exports = {fetchTopics}
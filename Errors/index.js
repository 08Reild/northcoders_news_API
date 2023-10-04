function handleCustomErrors(err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({ msg: "Not Found" });
    } 
    next()
}
function handlePSQLErrors(err, req, res, next) {
    if (err.status === 400) {
        res.status(400).send({ msg: "Bad Request" });
    } 
    next()
}


function handle500Errors(err, req, res, next) {
    res.status(500).send({ msg: "Internal Server Error" })
}

module.exports = {handle500Errors, handleCustomErrors, handlePSQLErrors}
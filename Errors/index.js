function handleCustomErrors(err, req, res, next) {
    if (err.status === 404) {
        console.log("Hi, I'm here!")
        res.status(404).send({ msg: "Not Found" });
    } else {
    next(err)
    }
}
function handlePSQLErrors(err, req, res, next) {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request" });
    }  else {
    next(err)
    }
}


function handle500Errors(err, req, res, next) {
    res.status(500).send({ msg: "Internal Server Error" })
}

module.exports = {handle500Errors, handleCustomErrors, handlePSQLErrors}
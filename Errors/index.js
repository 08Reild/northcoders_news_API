function handleCustomErrors(err, req, res, next) {
    //console.log(err, "<<<<I'm in the handleCUSTOMErrors")
    if (err.status === 404) {
        res.status(404).send({ msg: "Not Found" });
    } else {
    next(err)
    }
}
function handlePSQLErrors(err, req, res, next) {
    //console.log(err, "<<<<I'm in the handlePSQLErrors")
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request" });
    }  else {
    next(err)
    }
}

function handle500Errors(err, req, res, next) {
    //console.log(err, "<<<<I'm in the handle500Errors")
    res.status(500).send({ msg: "Internal Server Error" })
}

module.exports = {handle500Errors, handleCustomErrors, handlePSQLErrors}
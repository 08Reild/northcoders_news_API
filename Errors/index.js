function handleCustomErrors(err, req, res, next) {
    if (err.status === 404) {
        res.status(404).send({ msg: "Not Found" });
    } else {
        res.status(500).send({ msg: "Internal Server Error" });
    }
}

module.exports = {handleCustomErrors}

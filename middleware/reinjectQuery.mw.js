/**
 * Reinjects the request parameters as fields into the res.locals.params key.
 * 
 * This method calls next() in every case. 
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    return (req, res, next) => {
        res.locals.query = req.query;
        return next();
    };
}

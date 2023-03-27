/**
 * Creates or updates a result. If the res.locals.result key exists, we update its value with the values
 * received in the request body, else we create a new result with just the received values.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    return (req, res, next) => {
        return next();
    };
}

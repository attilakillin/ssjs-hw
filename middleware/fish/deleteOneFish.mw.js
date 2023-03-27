/**
 * Deletes a fish based on the ID path variable.
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
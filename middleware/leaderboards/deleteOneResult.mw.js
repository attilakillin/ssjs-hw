/**
 * Deletes a result based on the ID path variable.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Result = repo.Result;

    return (req, res, next) => {
        return Result.deleteOne({ _id: req.params.id }, (err) => {
            if (err) { return next(err); }
            return next();
        });
    };
}

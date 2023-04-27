/**
 * Loads a result instance based on the ID path variable, and sets the res.locals.result key to its value.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Result = repo.Result;

    return (req, res, next) => {
        Result.findOne({ _id: req.params.id }, (err, result) => {
            if (err) { return next(err); }

            res.locals.result = result;
            next();
        });
    };
}

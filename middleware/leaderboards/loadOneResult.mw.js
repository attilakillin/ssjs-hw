/**
 * Loads a result instance based on the ID path variable, and sets the res.locals.result key to its value.
 * 
 * This method calls next() in its main case. If there was an error, then the error is propagated as well.
 * If no error occurred, but no result exists with the given id, then the user will be redirected to /leaderboards.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Result = repo.Result;

    return (req, res, next) => {
        return Result.findOne({ _id: req.params.id }, (err, result) => {
            if (err) { return next(err); }
            if (result === null) { return res.redirect('/leaderboards'); }

            res.locals.result = result;
            return next();
        });
    };
}

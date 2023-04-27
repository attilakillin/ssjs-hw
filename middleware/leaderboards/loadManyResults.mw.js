/**
 * Loads multiple result instances based on the filter key of the query parameters.
 * If the filter key is empty, or nonexistent, the function loads every result in the database.
 * Sets the res.locals.resultList key to the loaded result list.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Result = repo.Result;

    return (req, res, next) => {
        const query = (req.query.filter || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        Result.find({ race: new RegExp('.*' + query + '.*', 'i') })
            .populate(['_winner', '_loser'])
            .exec((err, resultList) => {
                if (err) { return next(err); }

                res.locals.resultList = resultList;
                next();
            });
    };
}

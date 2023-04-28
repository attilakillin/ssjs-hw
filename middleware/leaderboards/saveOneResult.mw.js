const loadManyFish    = require('../fish/loadManyFish.mw');

/**
 * Creates or updates a result. If the res.locals.result key exists, we update its value with the values
 * received in the request body, else we create a new result with just the received values.
 * 
 * This method calls next() in its main case. If there was an error, then the error is propagated as well.
 * If a validation error occurs, the save is not performed, and the edit page is rerendered with an error.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Result = repo.Result;

    return (req, res, next) => {
        const result = res.locals.result || new Result();

        result.race = req.body.race;
        result.winnerTime = req.body.winnerTime;
        result._winner = req.body.winnerId; 
        result.loserTime = req.body.loserTime;
        result._loser = req.body.loserId;

        if (!result.race || !result.winnerTime || !result._winner || !result.loserTime || !result._loser) {
            res.locals.result = result;
            res.locals.error = 'Could not save result! There are empty or invalid fields!';

            /* We need to inject the fish list as well. */
            return loadManyFish(repo)(req, res, () => {
                return res.render('leaderboards-edit', res.locals);
            });
        }

        return result.save((err) => {
            if (err) { return next(err); }
            return next();
        });
    };
}

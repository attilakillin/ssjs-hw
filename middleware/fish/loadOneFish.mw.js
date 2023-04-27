/**
 * Loads a fish instance based on the ID path variable, and sets the res.locals.fish key to its value.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Fish = repo.Fish;

    return (req, res, next) => {
        Fish.findOne({ _id: req.params.id }, (err, fish) => {
            if (err) { return next(err); }

            res.locals.fish = fish;
            next();
        });
    };
}

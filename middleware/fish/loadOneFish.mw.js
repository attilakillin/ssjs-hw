/**
 * Loads a fish instance based on the ID path variable, and sets the res.locals.fish key to its value.
 * 
 * This method calls next() in its main case. If there was an error, then the error is propagated as well.
 * If no error occurred, but no fish exists with the given id, then the user will be redirected to /fish.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Fish = repo.Fish;

    return (req, res, next) => {
        return Fish.findOne({ _id: req.params.id }, (err, fish) => {
            if (err) { return next(err); }
            if (fish === null) { return res.redirect('/fish'); }

            res.locals.fish = fish;
            return next();
        });
    };
}

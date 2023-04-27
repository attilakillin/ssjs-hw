/**
 * Creates or updates a fish. If the res.locals.fish key exists, we update its value with the values
 * received in the request body, else we create a new fish with just the received values.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    const Fish = repo.Fish;

    return (req, res, next) => {
        const fish = res.locals.fish || new Fish();

        fish.name = req.body.name;
        fish.type = req.body.type;
        fish.weight = req.body.weight;
        fish.length = req.body.length;

        fish.save((err) => {
            if (err) { return next(err); }
            next();
        });
    };
}

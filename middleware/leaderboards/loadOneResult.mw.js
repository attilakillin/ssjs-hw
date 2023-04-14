/**
 * Loads a result instance based on the ID path variable, and sets the res.locals.result key to its value.
 * To make usage easier, the ids of the two necessary fish will be loaded as well.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    return (req, res, next) => {
        res.locals.result = {
            id: 1,
            race: '200 m gyorsúszás',
            winner: {
                id: 1,
                name: 'Béla',
                time: '1:25.012'
            },
            loser: {
                id: 2,
                name: 'János',
                time: '1:34.027'
            }
        };
        return next();
    };
}

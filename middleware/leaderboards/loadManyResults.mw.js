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
    return (req, res, next) => {
        res.locals.resultList = [
            {
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
            },
            {
                id: 2,
                race: 'Rákjárás az uszoda kertjében',
                winner: {
                    id: 2,
                    name: 'János',
                    time: '12:01.834'
                },
                loser: {
                    id: 3,
                    name: 'Jack',
                    time: '21:48.473'
                }
            }
        ];
        return next();
    };
}

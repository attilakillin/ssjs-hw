/**
 * Loads multiple fish instances based on the filter key of the query parameters.
 * If the filter key is empty, or nonexistent, the function loads every fish in the database.
 * Sets the res.locals.fishList key to the loaded fish list.
 * 
 * This method calls next() in every case. If there was an error, then the error is propagated as well.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    return (req, res, next) => {
        res.locals.fishList = [
            {
                id: 1,
                name: 'Béla',
                type: 'Tőkehal',
                weight: '25 kg',
                length: '74 cm'
            },
            {
                id: 2,
                name: 'János',
                type: 'Guppi',
                weight: '0.7 kg',
                length: '6 cm'
            },
            {
                id: 3,
                name: 'Jack',
                type: 'Kardszárnyú delfin',
                weight: '230 kg',
                length: '2.54 m'
            }
        ];
        return next();
    };
}

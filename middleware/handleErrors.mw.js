/**
 * Renders an error page to the user if an error occurred somewhere before in the middleware chain.
 * The entity-related middlewares may signal errors for various reasons, but it's not their job to
 * handle these and show a proper error page to the user. That task is reserved for this middleware.
 * 
 * This method only terminates the middleware chain if an error occurred before. If no error occurred,
 * nothing is done, and next() is called as expected.
 * @param {object} repo Shared object repository.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo) {
    return (req, res, next) => {
        if (typeof res.errors !== 'undefined') {
            return res.render('to be defined');
        } else {
            return next();
        }
    };
}

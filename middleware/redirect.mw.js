/**
 * Redirects to the path specified in the argument.
 * 
 * This method terminates the middleware chain, and won't call next() at its end.
 * @param {object} repo Shared object repository.
 * @param {string} target The path we wish to redirect the user to.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo, target) {
    return (req, res, next) => {
        return res.redirect(target);
    };
}

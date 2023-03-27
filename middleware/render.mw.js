/**
 * Renders a specified page in the response.
 * 
 * This method terminates the middleware chain, and won't call next() at its end.
 * @param {object} repo Shared object repository.
 * @param {string} view The name of the document we wish to render.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function (repo, view) {
    return (req, res, next) => {
        res.render(view);
    };
}

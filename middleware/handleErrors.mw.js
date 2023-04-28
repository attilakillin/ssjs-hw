/**
 * Renders an error page to the user if an error occurred somewhere before in the middleware chain.
 * The entity-related middlewares may signal errors for various reasons, but it's not their job to
 * handle these and show a proper error page to the user. That task is reserved for this middleware.
 * 
 * This method only terminates the middleware chain if an error occurred before. If no error occurred,
 * nothing is done, and next() is called as expected.
 * @returns An express middleware function that implements the task detailed above.
 */
module.exports = function () {
    return (err, req, res, next) => {
        if (typeof err === 'undefined' || !err) {
            return next();
        }
        
        return res.render('error.ejs');
    };
}

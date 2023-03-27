const deleteOneResult   = require('../middleware/leaderboards/deleteOneResult.mw');
const loadManyResults   = require('../middleware/leaderboards/loadManyResults.mw');
const loadOneResult     = require('../middleware/leaderboards/loadOneResult.mw');
const saveOneResult     = require('../middleware/leaderboards/saveOneResult.mw');

const handleErrors  = require('../middleware/handleErrors.mw');
const redirect          = require('../middleware/redirect.mw');
const render            = require('../middleware/render.mw');

/**
 * Creates the routes used by the /leaderboards path and its subpaths.
 * @param {object} app The express app instance to use.
 */
module.exports = function(app) {
    const repo = {};

    /** Load results list view (with an optional query-based filtering). */
    app.get('/leaderboards', 
        loadManyResults(repo),
        render(repo, 'leaderboards'));

    /** Load the edit new result view (without populating the editing fields). */
    app.get('/leaderboards/new',
        render(repo, 'leaderboards-edit'));

    /** Save a new result, and redirect the user. */
    app.post('/leaderboards/new',
        saveOneResult(repo),
        handleErrors(repo),
        redirect(repo, '/leaderboards'));

    /** Load the edit existing result view (populates the editing fields). */
    app.get('/leaderboards/edit/:id',
        loadOneResult(repo),
        handleErrors(repo),
        render(repo, 'leaderboards-edit'));

    /** Update an existing result, and redirect the user. */
    app.post('/leaderboards/edit/:id',
        loadOneResult(repo),
        saveOneResult(repo),
        handleErrors(repo),
        redirect(repo, '/leaderboards'));

    /** Delete an existing result, and redirect the user back. */
    app.get('/leaderboards/delete/:id',
        loadOneResult(repo),
        deleteOneResult(repo),
        handleErrors(repo),
        redirect(repo, '/leaderboards'));
}

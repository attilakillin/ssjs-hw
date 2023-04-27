const Fish = require('../models/fish');
const Result = require('../models/result');

const deleteOneResult = require('../middleware/leaderboards/deleteOneResult.mw');
const loadManyResults = require('../middleware/leaderboards/loadManyResults.mw');
const loadOneResult   = require('../middleware/leaderboards/loadOneResult.mw');
const saveOneResult   = require('../middleware/leaderboards/saveOneResult.mw');

const loadManyFish    = require('../middleware/fish/loadManyFish.mw');

const reinjectQuery   = require('../middleware/reinjectQuery.mw');
const redirect        = require('../middleware/redirect.mw');
const render          = require('../middleware/render.mw');

/**
 * Creates the routes used by the /leaderboards path and its subpaths.
 * @param {object} app The express app instance to use.
 */
module.exports = function(app) {
    const repo = { Fish, Result };

    /** Load results list view (with an optional query-based filtering). */
    app.get('/leaderboards', 
        loadManyResults(repo),
        reinjectQuery(repo),
        render(repo, 'leaderboards'));

    /** Load the edit new result view (without populating the editing fields). */
    app.get('/leaderboards/new',
        loadManyFish(repo),
        render(repo, 'leaderboards-edit'));

    /** Save a new result, and redirect the user. */
    app.post('/leaderboards/new',
        saveOneResult(repo),
        redirect(repo, '/leaderboards'));

    /** Load the edit existing result view (populates the editing fields). */
    app.get('/leaderboards/edit/:id',
        loadManyFish(repo),
        loadOneResult(repo),
        render(repo, 'leaderboards-edit'));

    /** Update an existing result, and redirect the user. */
    app.post('/leaderboards/edit/:id',
        loadOneResult(repo),
        saveOneResult(repo),
        redirect(repo, '/leaderboards'));

    /** Delete an existing result, and redirect the user back. */
    app.get('/leaderboards/delete/:id',
        deleteOneResult(repo),
        redirect(repo, '/leaderboards'));
}

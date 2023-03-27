const deleteOneFish = require('../middleware/fish/deleteOneFish.mw');
const loadManyFish  = require('../middleware/fish/loadManyFish.mw');
const loadOneFish   = require('../middleware/fish/loadOneFish.mw');
const saveOneFish   = require('../middleware/fish/saveOneFish.mw');

const handleErrors  = require('../middleware/handleErrors.mw');
const redirect      = require('../middleware/redirect.mw');
const render        = require('../middleware/render.mw');

/**
 * Creates the routes used by the /fish path and its subpaths.
 * @param {object} app The express app instance to use.
 */
module.exports = function(app) {
    const repo = {};

    /** Load fish list view (with an optional query-based filtering). */
    app.get('/fish', 
        loadManyFish(repo),
        render(repo, 'fish'));

    /** Load the edit new fish view (without populating the editing fields). */
    app.get('/fish/new',
        render(repo, 'fish-edit'));

    /** Save a new fish, and redirect the user. */
    app.post('/fish/new',
        saveOneFish(repo),
        handleErrors(repo),
        redirect(repo, '/fish'));

    /** Load the edit existing fish view (populates the editing fields). */
    app.get('/fish/edit/:id',
        loadOneFish(repo),
        handleErrors(repo),
        render(repo, 'fish-edit'));

    /** Update an existing fish, and redirect the user. */
    app.post('/fish/edit/:id',
        loadOneFish(repo),
        saveOneFish(repo),
        handleErrors(repo),
        redirect(repo, '/fish'));

    /** Delete an existing fish, and redirect the user back. */
    app.get('/fish/delete/:id',
        loadOneFish(repo),
        deleteOneFish(repo),
        handleErrors(repo),
        redirect(repo, '/fish'));
}

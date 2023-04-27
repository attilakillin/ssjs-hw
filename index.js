/* Initialize Express. */
const express = require('express');
const bodyParser = require('body-parser');

/* Initialize DB connection. */
require('mongoose');

/* Set up application. */
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

/* Set routing. As the CSS is served from CDN, no static resource is served. */
require('./routing/fish.routes')(app);
require('./routing/leaderboards.routes')(app);
app.use('/', require('./middleware/redirect.mw')({}, '/fish'));

/* Start server. */
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

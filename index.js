const redirect = require('./middleware/redirect.mw');

const express = require('express');
const app = express();

/* Set the required routes. */
app.use('/', express.static('public')); // Temporary, will be replaced with the next line:
//app.use('/', redirect({}, '/fish'));
require('./routing/fish.routes')(app);
require('./routing/leaderboards.routes')(app);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

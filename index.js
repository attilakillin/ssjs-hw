const express = require('express');
const app = express();

/* Set the required routes. */
app.use('/', express.static('public'));
require('./routing/fish.routes')(app);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

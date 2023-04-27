const db = require('../config/db');

const Fish = db.model('Fish', {
    name: String,
    type: String,
    weight: String,
    length: String
});

module.exports = Fish;

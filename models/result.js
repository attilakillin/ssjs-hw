const db = require('../config/db');

const Result = db.model('Result', {
    race: String,
    _winner: {
        type: db.Schema.Types.ObjectId,
        ref: 'Fish'
    },
    winnerTime: String,
    _loser: {
        type: db.Schema.Types.ObjectId,
        ref: 'Fish'
    },
    loserTime: String
});

module.exports = Result;

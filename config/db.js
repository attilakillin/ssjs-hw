const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/JNSBBK');

module.exports = mongoose;

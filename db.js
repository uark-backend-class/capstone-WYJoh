
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/results");

mongoose.connection.once('open', () => {
    console.log("Connected to mongodb");
});

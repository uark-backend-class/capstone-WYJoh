const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
require('./db');

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("./style"));
app.use(routes);

app.listen(3000, () => {
    console.log("Now listening on port 3000");
});
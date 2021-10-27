require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("./style"));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("now listening on port 3000");
});

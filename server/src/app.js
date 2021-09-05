const express = require('express');
const bodyParser = require('body-parser');

// routes
const mainRoute = require('./routes');
const userRoute = require('./routes/users');

const app = express();

app.use(bodyParser.json());

app.use('/', mainRoute);
app.use('/users', userRoute);

module.exports = app;
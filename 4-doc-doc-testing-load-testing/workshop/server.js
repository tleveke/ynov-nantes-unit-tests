const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const PORT = process.env.PORT || 5000;
const app = express();
require('./database/db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));


const indexRoute = require('./routes/index');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/', indexRoute);

app.listen(PORT);
console.log('Listening on port: ' + PORT);
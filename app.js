const express = require('express')
const bodyParser = require('body-parser')
require('./db/db')
const fbrouter = require('./router/route')
const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(fbrouter);
app.listen("3010");
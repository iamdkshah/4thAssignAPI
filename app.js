const express = require('express')
const bodyParser = require('body-parser')
require('./db/db')
const fbrouter = require('./router/route')
const app = express()
const path = require('path')
const multer = require('multer')
const publicDir = path.join(__dirname,'public')
app.use(express.static(publicDir))


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(fbrouter);
app.listen("3010");
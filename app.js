const express = require('express')
const bodyParser = require('body-parser')
require('./db/db')

const cors = require('cors')
const app = express()
const path = require('path')
const multer = require('multer')
app.use(cors());

const publicDir = path.join(__dirname,'public')
app.use(express.static(publicDir))


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
const fbrouter = require('./router/route')
app.use(fbrouter);

app.listen(3010);
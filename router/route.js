const express = require('express')
const Model = require('..model/user')
const bodyParser = require('body-parser')
const router = new express.Router()
const auth = require
const express = require('express')
const Model = require('../model/user')
const bodyParser = require('body-parser')
const router = new express.Router()
const auth = require('../middleware/auth')

router.use(bodyParser.urlencoded({extended: false}));

router.post('/insert', (req,res)=>{
    var fbData = new Model(req.body);
    fbData.save();
    res.send("success");
})

module.exports = router
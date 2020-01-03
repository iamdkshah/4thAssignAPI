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

router.post('/login', async function (req, res) {
    try {
        const user = await Model.checkCrediantialsDb(req.body.name,
            req.body.password)
        const token = await user.generateAuthToken()
            res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router
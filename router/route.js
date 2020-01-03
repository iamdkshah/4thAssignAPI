const express = require('express')
const Model = require('../model/user')
const Model2 = require('../model/postbyuser')
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

//select
router.get('/selectusers', auth, function (req, res) {
    Task.find().then(function (fb_users_data) {
        res.send(fb_users_data);
    }).catch(function (e) {
        res.send(e)
    });
})

//delete
router.delete('/deleteuser/:_id', function (req, res) {
    Model.findByIdAndDelete(req.params._id).then(function () {
        res.send("User is Deleted")
    }).catch(function (e) {
        res.send(e);
    });
})

//update
router.put('/updateuser/:_id', function (req, res) {
    Model.findOneAndUpdate({ _id: req.params._id }, req.body).then(function () {
        res.send("user is updated")
    }).catch(function (e) {
        res.send(e)
    });
})

//adding post
router.post('/addpost', (req,res)=>{
    var fbpostdata = new Model2(req.body);
    fbpostdata.save().then(function(){
        res.send("Post succuess");
    }).catch(function(e){
        res.send(e)
    })
})

//finding post
router.get('/findpost',(req,res)=>{
    fbpostdata.find().then(function(findallpost){
        res.send(findallpost)
    }).catch(function(e){
        res.send(e)
    })
})

module.exports = router
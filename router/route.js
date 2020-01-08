const express = require('express')
const Model = require('../model/user')
const Model2 = require('../model/postbyuser')
const bodyParser = require('body-parser')
const router = new express.Router()
const auth = require('../middleware/auth')
const imgUpload = require('../multer')

router.use(bodyParser.urlencoded({extended: false}));

router.post('/insert', (req,res)=>{
    //console.log("in here");
    var fbData = new Model(req.body);
    fbData.save();
    res.json({message:"success"});
})

router.post('/login', async function (req, res) {
    try {
        const user = await Model.checkCrediantialsDb(req.body.email,
            req.body.password)
        const token = await user.generateAuthToken()
            res.send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})


//adding post
router.post('/addpost', imgUpload, (req,res)=>{
    req.files.map(function(items){
        var fbpostdata = new Model2({
            name: req.body.name,
            image: req.body.image,
            status: items.filename
        })
        fbpostdata.save().then(function(){
            res.send("Post succuess");
        })
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
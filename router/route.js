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

//login
router.post('/login', async function (req, res) {
    try {
        const user = await Model.checkCrediantialsDb(req.body.email,
            req.body.password)
        const token = await user.generateAuthToken()
        const name = await user.name
            res.send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})


//adding post
router.post("/addpost",[imgUpload],(req, res) => {
    
    console.log(req.body)
    console.log(req.files)
    req.files.map(function(items){
        const Post = new Model2({
            status:req.body.status,
            name:req.body.name,
            image:items.filename 
           
        }
        
        )
            Post.save().then(function( ){
                res.send("post has been added")
            }).catch(function(e){
                res.send(e)
            })

    })
    
})

//finding post
router.get('/findpost',auth,(req,res)=>{
    Model2.find().then(function(findallpost){
        res.send(findallpost)
    }).catch(function(e){
        res.send(e)
    })
})

module.exports = router
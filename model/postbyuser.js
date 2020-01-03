const mongoose = require('mongoose')
const post = mongoose.model('Post',{
    name:{
        type:String,
        require:true,
        trim:true
    },
    image:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:String,
        require:true,
        trim:true
    }
})

module.exports = post
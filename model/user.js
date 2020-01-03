const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    adress:{
        type: String
    },
    phone:{
        type: String
    },
    gender:{
        type: String
    },
    dob:{
        type: String
    },

    tokens:[{
        token:{
            type:String
        }
    }]

})

const User = mongoose.model('Model', userSchema)
module.exports = User
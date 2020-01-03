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
    address:{
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
            type:String,
            required:true
        }
    }]

})



userSchema.statics.checkCrediantialsDb = async (deepak, deep) => {

    const user1 = await User.findOne({ name: deepak, password: deep })
    return user1;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, '4thAssignApi')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

const User = mongoose.model('Model', userSchema)
module.exports = User
const mongoose = require('mongoose')
const validatorLib = require('validator')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : [true,'An email must be entered'],
        validate : {
            validator : validatorLib.isEmail,
            message : props => `${props.value} is not an email`
        }
    },
    codeforces : {
        type : Boolean,
        default : true
    },
    codechef : {
        type : Boolean,
        default : true
    }
})

const users = mongoose.model('Users',userSchema)
module.exports = users
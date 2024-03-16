const mongoose = require('mongoose')


const contestSchema = new mongoose.Schema({
    name : String,
    time : Number,
    codechef : {
        type : Boolean,
        default : false
    },
    codeforces : {
        type : Boolean,
        default : false
    }
})

const contests = mongoose.model('Contests',contestSchema)
module.exports = contests
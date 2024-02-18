const mongoose = require('mongoose')
const User = require('../database/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function loginController(req,res,next){
    try{
        const claimedUser = await User.findOne({username : req.body.username})
        if(!claimedUser){
            return res.status(404).send('User does not exist')
        }
        const match = await bcrypt.compare(req.body.password,claimedUser.password)
        if(match){
            const token =  await jwt.sign({username : claimedUser.username},process.env.JWT_SECRET)
            res.status(200).json({accessToken : token})
        }
        else{
            res.send('Incorrect Password')
        }
    }
    catch(err){
        res.send('An error has occoured')
        console.log(err)
    }
}
async function registerUserController(req,res,next){
    try{
        const existingUser = await User.findOne({'username' : req.body.username})
        if(existingUser){
            return res.send('Username already in use, Try a different one')
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const currUser = new User({
            username : req.body.username,
            password : hashedPassword
        })
        await currUser.save()
        res.send(`You have been created ${req.body.username}!!`)
    }
    catch(err){
        res.send('An error has occoured')
        console.log(err)
    }
}

async function fetchUserdashboard(req,res,next){
    res.send(`Hello ${req.body.username}`)
}

module.exports = {loginController,registerUserController,fetchUserdashboard}
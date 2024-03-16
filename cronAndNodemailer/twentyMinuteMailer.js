const mongoose = require('mongoose')
const Users = require('../database/userModel')
const nodemailer = require('nodemailer')
const Contest = require('../database/contests')
const contestsDatabaseCleaner = require('../database/contestsDatabaseCleaner')
require('dotenv').config()
const transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.mail.com',
    port : 587,
    secure : true,
    auth : {
        user : process.env.GOOGLE_SENDER_MAIL_ID,
        pass : process.env.GOOGLE_APP_PASSWORD
    }
})

async function twentyMinuteMailer(){
    const allContests = await Contest.find({})
    const allUsers = await Users.find({})
    for(let i = 0;i<allUsers.length;i++){
        for(let j = 0;j<allContests.length;j++){
            let currTimeSec = Date.now()
            currTimeSec = Math.floor(currTimeSec/1000)
            let upperRange = (30*60) + currTimeSec
            let lowerRange = (10*60) + currTimeSec
            if(allContests[j].time >= lowerRange && allContests[j].time <= upperRange){
                if(allContests[j].codeforces===true && allUsers[i].codeforces===true){
                    const finalString = `Dear ${allUsers[i].username} there is an upcoming Codeforces contest - ${allContests[j].name}`
                    const mailOptions = {
                        from :{
                            name : 'Contest-Mailer',
                            address : process.env.GOOGLE_SENDER_MAIL_ID
                        },
                        to : users[i].email,
                        subject : 'Near Contest Reminder',
                        text : finalString
                    }
                    try{
                        await transporter.sendMail(mailOptions)
                        console.log('Mail sent!!')
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                if(allContests[j].codechef===true && allUsers[i].codechef===true){
                    const finalString = `Dear ${allUsers[i].username} there is an upcoming Codechef contest - ${allContests[j].name}`
                    const mailOptions = {
                        from :{
                            name : 'Contest-Mailer',
                            address : process.env.GOOGLE_SENDER_MAIL_ID
                        },
                        to : users[i].email,
                        subject : 'Near Contest Reminder',
                        text : finalString
                    }
                    try{
                        await transporter.sendMail(mailOptions)
                        console.log('Mail sent!!')
                    }
                    catch(err){
                        console.log(err)
                    }
                }
            }
        }
    }
    contestsDatabaseCleaner()
}


module.exports = twentyMinuteMailer
const mongoose = require('mongoose')
const Users = require('../database/userModel')
const nodemailer = require('nodemailer')
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
async function realFunction(cfData,ccName,ccTime){
    const filter = {}
    ccName = JSON.stringify(ccName)
    const users = await Users.find(filter)
    for(let i = 0;i<users.length;i++){
        let message = []
        if(users[i].codechef === true){
            let currArr = []
            currArr.push('CodeChef Contest')
            currArr.push(` Name of the contest is ${ccName}`)
            currArr.push(` Time to the contest is ${ccTime[0]} and ${ccTime[1]}`)
            message.push(currArr)
        }
        if(users[i].codeforces === true){
            for(let i = 0;i<cfData.length;i++){
                let currArr = []
                let currTimeSec = Date.now()
                currTimeSec = Math.floor(currTimeSec/1000)
                let startTimeContest = cfData[i].startTimeSeconds
                let remTime = startTimeContest - currTimeSec
                let hours = Math.floor(remTime/3600)
                let minutes = remTime - (hours*3600)
                minutes = Math.floor(minutes/60)
                currArr.push('Codeforces Contest ')
                currArr.push(cfData[i].name)
                currArr.push(`Time to the contest is ${hours} hours and ${minutes} minutes`)
                message.push(currArr)
            }
        }
        for(let i = 0;i<message.length;i++){
            message[i] = JSON.stringify(message[i])
        }
        let finalString = "You have the following contest: ";
        for(let i = 0;i<message.length;i++){
            for(let j = 0;j<message[i].length;j++){
                finalString = finalString.concat(message[i][j])
            }
            for(let j = 0;j<6;j++){
                finalString.concat(" ")
            }
        }
        const mailOptions = {
            from :{
                name : 'Contest-Mailer',
                address : process.env.GOOGLE_SENDER_MAIL_ID
            },
            to : users[i].email,
            subject : 'Upcoming Contests',
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

module.exports = realFunction
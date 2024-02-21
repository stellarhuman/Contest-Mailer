const mongoose = require('mongoose')
const Users = require('../database/userModel')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.mail.com',
    port : 465,
    secure : true,
    auth : {
        user : process.env.GOOGLE_SENDER_MAIL_ID,
        pass : process.env.GOOGLE_APP_PASSWORD
    }
})
async function realFunction(data){
    const filter = {'codeforces' : true}
    const codeforcesUsers = await Users.find(filter)
    for(let i = 0;i<codeforcesUsers.length;i++){
        const message = `${codeforcesUsers[i].username} you have the following contest approaching : 
        ${data}`
        const mailOptions = {
            from :{
                name : 'Contest-Mailer',
                address : process.env.GOOGLE_SENDER_MAIL_ID
            },
            to : codeforcesUsers[i].email,
            subject : 'Upcoming Codeforces contests',
            text : message
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
const express = require('express')
const cron = require('node-cron')
const app = express()
app.use(express.json())
const connectToDB = require('./database/connect')
const userRouter = require('./routes/userRouter')
const mailAutomationCron = require('./cronAndNodemailer/automation')
const twentyMinuteMailer = require('./cronAndNodemailer/twentyMinuteMailer')
app.use('/users',userRouter)
const port = 3000
async function startPortAndConnectToDB(){
    try{
        await connectToDB()
        app.listen(port,()=>{
            console.log(`App listing on port ${port}`)
        })
        cron.schedule('0 20 * * *',mailAutomationCron)
        cron.schedule('*/20 * * * *',twentyMinuteMailer)
    }
    catch(err){
        console.log(err)
    }
}

startPortAndConnectToDB()
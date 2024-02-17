const express = require('express')
const app = express()
app.use(express.json())
const connectToDB = require('./database/connect')
const userRouter = require('./routes/userRouter')
app.use('/users',userRouter)




const port = 3000
async function startPortAndConnectToDB(){
    try{
        await connectToDB()
        app.listen(port,()=>{
            console.log(`App listing on port ${port}`)
        })
    }
    catch{

    }
}

startPortAndConnectToDB()
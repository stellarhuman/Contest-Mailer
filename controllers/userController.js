




async function loginController(req,res,next){
    try{
        res.send('Login controller')
    }
    catch(err){
    }
}

async function registerUserController(req,res,next){
    try{
        res.json(req.body)
    }
    catch(err){

    }
}

module.exports = {loginController,registerUserController}
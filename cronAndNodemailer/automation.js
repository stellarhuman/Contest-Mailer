const realFunction = require('./automation2')
const axios = require('axios')
let cnum = 1
async function mailAutomationCron(){
    await axios.get('https://codeforces.com/api/contest.list')
    .then(function(response){
        const data = response.data.result
        const newData = []
        for(let i = 0;i<data.lenght;i++){
            if(data[i].phase==='BEFORE'){
                newData.push(data[i])
            }
            else{
                break
            }
        }
        realFunction(newData)
    })
    .catch(function(err){
        console.log(err)
    })
}


module.exports = {mailAutomationCron}
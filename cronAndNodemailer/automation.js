const realFunction = require('./automation2')
const chefFunctions = require('../Web-Scraping/codechefWebScraper')
const axios = require('axios')
async function mailAutomationCron(){
    try {
        let newData = []
        await axios.get('https://codeforces.com/api/contest.list').then((response)=>{
            const data = response.data.result
            for(let i = 0;i<data.length;i++){
                if(data[i].phase==='BEFORE'){
                    newData.push(data[i])
                }
                else{
                    break
                }
            }
        })
        let chefData = await chefFunctions.codechefDataExtractor()
        let chefTime = await chefFunctions.codechefTimeExtractor()
        realFunction(newData,chefData,chefTime)
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = mailAutomationCron
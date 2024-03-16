const realFunction = require('./automation2')
const chefFunctions = require('../Web-Scraping/codechefWebScraper')
const axios = require('axios')
const Contest = require('../database/contests')
const mongoose = require('mongoose')
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
        for(let i = 0;i<newData.length;i++){
            const existingContest = await Contest.findOne({'name' : newData[i].name , 'codeforces' : true})
            if(existingContest){
                continue
            }
            const newContest = new Contest({
                name : newData[i].name,
                time : newData[i].startTimeSeconds,
                codeforces : true
            })
            await newContest.save()
        }
        let chefData = await chefFunctions.codechefDataExtractor()
        let chefTime = await chefFunctions.codechefTimeExtractor()
        if(chefTime[0][2]==='D'){
            const existingContest = await Contest.findOne({'name' : chefData , 'codechef' : true})
            if(!existingContest){
                let days = parseInt(chefTime[0])
                let hours = parseInt(chefTime[1])
                let currArr = []
                let currTimeSec = Date.now()
                currTimeSec = Math.floor(currTimeSec/1000)
                currTimeSec += (days*86400)
                currTimeSec += (hours*3600)
                const newContest = new Contest({
                    name : chefData,
                    codechef : true,
                    time : currTimeSec
                })
                await newContest.save()
            }
        }
        realFunction(newData,chefData,chefTime)
    } 
    catch (error) {
        console.log(error)
    }
}
module.exports = mailAutomationCron
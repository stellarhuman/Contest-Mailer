const contests = require('./contests')
async function contestsDatabaseCleaner(){
    const allContests = await contests.find({})
    const currTimeSec = Date.now()
    currTimeSec = Math.floor(currTimeSec/1000)
    for(let i = 0;i<allContests.length;i++){
        if(allContests[i].time<currTimeSec){
            contests.deleteOne({'name' : allContests[i].name, "codechef" : allContests[i].codechef, "codeforces" : allContests[i].codeforces})
        }
    }
}

module.exports = contestsDatabaseCleaner
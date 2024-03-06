const puppeteer = require('puppeteer')
async function fetchDataFromChef(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.codechef.com/contests")
    await page.waitForSelector('._data__container_ioa8k_507 a span');
    const contestName = await page.evaluate(()=>{
        const contentsInSpan = document.querySelector('._data__container_ioa8k_507 a span')
        return contentsInSpan.innerHTML
    })
    await browser.close()
    return contestName
}
async function fetchTimeFromchef(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.codechef.com/contests')
    await page.waitForSelector('._timer__container_ioa8k_561');
    const contestTime = await page.evaluate(()=>{
        const timerContainer = document.querySelector('._timer__container_ioa8k_561');
        const paragraphs = timerContainer.querySelectorAll('p');
        const times = Array.from(paragraphs).map(p => p.textContent.trim());
        return times;
    })
    await browser.close()
    return contestTime
}
async function codechefDataExtractor() {
    try {
        const contestNameAndRatedTill = await fetchDataFromChef()
        return contestNameAndRatedTill
    } catch (error) {
        console.log(error)
    }
}
async function codechefTimeExtractor() {
    try {
        const contesttTime = await fetchTimeFromchef()
        return contesttTime
    } catch (error) {
        console.log(error)
    }
}

module.exports = {codechefDataExtractor,codechefTimeExtractor}
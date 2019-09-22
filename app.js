const cheerio=require('cheerio');
const {Builder,By,until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');    
require('dotenv').config();
// const moment = require("moment");

const cheeriotableparser=require("cheerio-tableparser");

let stocks= async() => {

    let driver= await new Builder().forBrowser('chrome').build();
    // await driver.get('https://www.moneycontrol.com/financials/axisbank/balance-sheetVI/AB16#AB16');
    await driver.get('https://www.moneycontrol.com/financials/bajajauto/balance-sheetVI/BA10#BA10');
    await driver.wait(until.elementLocated(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]/tbody')),10000);

    let tablelement = await driver.findElement(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]/tbody'));
    let data = await tablelement.getAttribute('innerHTML');
    let $ = cheerio.load(`<html><head></head><table>${data}</table></html>`);
    cheeriotableparser($);
    let arr = $('table').parsetable(true, true, true);
    debt_to_equity = (parseFloat(arr[1][12])+parseFloat(arr[1][13]))/(parseFloat(arr[1][6]));
    debt_to_equity = debt_to_equity.toFixed(2);
     

    let button=await driver.findElement(By.xpath('//*[@id="slider"]/dd[3]/ul/li[2]/a'));
    await button.click();

    await driver.wait(until.elementLocated(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]')),10000);
    let tablelement1 = await driver.findElement(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]'));
    let data1 = await tablelement1.getAttribute('innerHTML');
    let $$ = cheerio.load(`<html><head></head><table>${data1}</table></html>`);
    cheeriotableparser($$);
    let arr1 = $$('table').parsetable(true, true, true);
    sales = arr1[1][11];
    inte_coverage_ratio = (parseFloat(sales))/(parseFloat(arr[1][13]));
    inte_coverage_ratio = inte_coverage_ratio.toFixed(2);
    price_per_share = 680.35;     //
    earning_per_share = (arr1[1][39]);
    PE_Ratio=(parseFloat(price_per_share))/(parseFloat(earning_per_share))
    PE_Ratio=PE_Ratio.toFixed(2);
    response=[];

    let button1=await driver.findElement(By.xpath('//*[@id="slider"]/dd[3]/ul/li[8]/a'));
        await button1.click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]/tbody')),10000);
        let tablelement2 = await driver.findElement(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[1]/table[2]/tbody'));
        let data2 = await tablelement2.getAttribute('innerHTML');
        let $$$ = cheerio.load(`<html><head></head><table>${data2}</table></html>`);
        cheeriotableparser($$$);
        let arr2 = $$$('table').parsetable(true, true, true);
        return_on_networth=arr2[1][21]


        response.push({
            Debt_to_equity:debt_to_equity,
            Sales:sales,
            Interest_Coverage_Ratio:inte_coverage_ratio,
            Price_to_Earning_Ratio:PE_Ratio,
            Return_On_Equity_ratio:return_on_networth
        })

    
    // console.log(response);

    await driver.get('https://www.moneycontrol.com/financials/bajajauto/balance-sheetVI/BA10#BA10');
    
}

// stocks()

let news = async() =>{


    // let driver= await new Builder().forBrowser('chrome').build();
    // await driver.get('https://www.moneycontrol.com/company-article/axisbank/news/AB16');
    // await driver.wait(until.elementLocated(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div/div[3]')),10000);
    // let divelement = await driver.findElement(By.xpath('//*[@id="mc_mainWrapper"]/div[3]/div[2]/div[3]/div[2]/div[2]/div/div[3]'));
    // let data = await divelement.getAttribute('innerHTML');
    // let $ = cheerio.load(`<html><head></head><table>${data}</table></html>`);
    // cheeriotableparser($);
    // let arr = $('table').parsetable(true, true, true);
    // console.log();

    $=cheerio.load('https://www.moneycontrol.com/company-article/asianpaints/news/AP31');
    news=[] 

    $('div.div').each(function(index, element){
        news[index]={};
        var div = $(element).find('.div.div');
        news[index]['newz'] = $(div).find('[href=/news/stocksnews/stocksthe-news-dlf-aavas-financiers-tcs-nbcc-kaveri-seed-wipro-mindtree-trf_12989321.html]').text();


    });

    console.log(typeof(news));  
}

news()
// const puppy = require("puppeteer");
// let fs = require('fs');
// // const data=require("./data.json");
// let para = [];
// let careerData = [];
// async function main() {
//     let browser = await puppy.launch({
//         headless: false,
//         defaultViewport: false,
//         args: ['--start-maximized']
//     });

//     let tab;

//     let pages = await browser.pages();
//     tab = pages[0];

//     let wiki = "Wikipedia";
//     let his=[];
//     let uses=[];
    
//     await tab.goto("https://www.google.com/");
//     await tab.waitForSelector(".gLFyf.gsfi");
//     await tab.type('input[type="text"]',wiki);
//     await tab.keyboard.press("Enter");
//     await tab.waitForSelector(".LC20lb.MBeuO.DKV0Md");
//     await tab.click(".LC20lb.MBeuO.DKV0Md");
//     await tab.waitForSelector("#js-link-box-en");
//     await tab.click("#js-link-box-en");
//     await tab.waitForSelector(".portal-hright.portal-vbot");
//     await tab.click(".portal-hright.portal-vbot");
//     let link1 =await tab.$$(".hlist.noprint ul li");
//     await tab.goto("https://en.wikipedia.org/wiki/Wikipedia:Contents/A%E2%80%93Z_index");
//     await tab.goto("https://en.wikipedia.org/wiki/Special:AllPages/U");
//     await tab.goto(" https://en.wikipedia.org/wiki/U");
//     await tab.waitForSelector(".mw-parser-output");
//     let p =await tab.$$(".mw-parser-output p");
   
//     console.log(p.length);

//     // console.log( await ( await p[4].getProperty( 'innerText' ) ).jsonValue() );
//     // console.log( await ( await p[5].getProperty( 'innerText' ) ).jsonValue() );
//     his.push(await ( await p[4].getProperty( 'innerText' ) ).jsonValue()) ;
//     his.push( await ( await p[5].getProperty( 'innerText' ) ).jsonValue()) ;
//     for(let i = 11 ; i < 20 ; i++){
//         uses.push( await ( await p[i].getProperty( 'innerText' ) ).jsonValue()) ;
//     }
//     careerData.push({"History": his});
//     careerData.push({"Uses": uses});
//     fs.writeFileSync("history.JSON",JSON.stringify(careerData))

//      await tab.close();
    
    
// }
// main();

const puppy = require("puppeteer");
let fs = require('fs');
let careerData = [];
async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ['--start-maximized']
    });

    let tab;

    let pages = await browser.pages();
    tab = pages[0];

    let wiki = "Wikipedia";
    let his=[];
    let use=[];
    let uses=[];
    
    await tab.goto("https://www.google.com/");
    await tab.waitForSelector(".gLFyf.gsfi");
    await tab.type('input[type="text"]',wiki);
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".LC20lb.MBeuO.DKV0Md");
    await tab.click(".LC20lb.MBeuO.DKV0Md");
    await tab.waitForSelector("#js-link-box-en");
    await tab.click("#js-link-box-en");
    await tab.waitForSelector(".portal-hright.portal-vbot");
    await tab.click(".portal-hright.portal-vbot");
    await tab.waitForSelector("div.hlist.noprint ul li a");
    let link1 = await tab.$$("div.hlist.noprint");
    let inner_html = await link1[0].$$("ul li a");
    let inner_link = "";
    if(inner_html)
        { inner_link = (await ( await inner_html[inner_html.length-1].getProperty( 'href' ) ).jsonValue());}
    
    await tab.goto(inner_link);


    await tab.waitForSelector("#toc tbody tr td b a");
    let trs = await tab.$$("#toc tbody tr");

    
    if(trs && trs.length > 42){
        let UTag = await trs[42].$$("td b a");
        if(UTag){
            inner_link = await(await UTag[0].getProperty("href")).jsonValue();
            await tab.goto(inner_link);
        }
    }

    await tab.waitForSelector("ul.mw-allpages-chunk li a");
    let link12 = await tab.$$("ul.mw-allpages-chunk li a");
    if(link12) {
        inner_link = await(await link12[0].getProperty("href")).jsonValue();
        await tab.goto(inner_link);
    }


    await tab.waitForSelector(".mw-parser-output");
    let p =await tab.$$(".mw-parser-output p");
   
    his.push(await ( await p[4].getProperty( 'innerText' ) ).jsonValue()) ;
    his.push( await ( await p[5].getProperty( 'innerText' ) ).jsonValue()) ;
    for(let i = 5 ; i <=8 ; i++){
        use.push( await ( await p[i].getProperty( 'innerText' ) ).jsonValue()) ;
    }
    for(let i = 11 ; i < 20 ; i++){
        uses.push( await ( await p[i].getProperty( 'innerText' ) ).jsonValue()) ;
    }
    careerData.push({"History": his});
    careerData.push({"Use in Witing System": use});
    careerData.push({"Other Uses": uses});
    fs.writeFileSync("history.JSON",JSON.stringify(careerData))

     await tab.close();
    
    
}
main();
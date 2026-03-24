import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
page.on('console', msg => console.log('PAGE LOG:', msg.text()));
await page.goto('http://localhost:5174');
await page.waitForTimeout(2000);
console.log('DOM:', await page.content());
await browser.close();

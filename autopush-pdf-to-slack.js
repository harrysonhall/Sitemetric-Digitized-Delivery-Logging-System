const puppeteer = require('puppeteer');
const fs = require('fs');
const { WebClient } = require('@slack/web-api');

// Initialize the Slack Web API client
const web = new WebClient('xoxb-5377527789442-5362998249047-tdd4gIRBr6xNDtmC5r4PrX7o');

async function createPdfAndSendToSlack() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({width: 1500, height: 1000});
  await page.goto('https://cryptic-headland-11431-325b3506e0ae.herokuapp.com', {waitUntil: 'networkidle0'});

  const height = await page.evaluate(() => document.documentElement.offsetHeight);
  const pdf = await page.pdf({
    height: `${height}px`,
    printBackground: true,
    width: '2000px',
    path: 'file.pdf'
  });

  await browser.close();

  // Upload the file to Slack
  const result = await web.files.upload({
    filename: 'file.pdf',
    file: fs.createReadStream('file.pdf'),
    channels: 'general',
    title: 'Daily Delivery Log - June 9, 2023',
    initial_comment: 'Turner 11 - June 9, 2023',
  });

  // Delete the local screenshot file
  fs.unlinkSync('file.pdf');
}

createPdfAndSendToSlack().catch(console.error);

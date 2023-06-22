const puppeteer = require('puppeteer');
const fs = require('fs');
const { WebClient } = require('@slack/web-api');

// Initialize the Slack Web API client
const web = new WebClient('xoxb-5377527789442-5362998249047-tdd4gIRBr6xNDtmC5r4PrX7o');

async function createScreenshotAndSendToSlack() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('https://cryptic-headland-11431-325b3506e0ae.herokuapp.com', {waitUntil: 'networkidle0'});

  // Get the height of the web page
  const height = await page.evaluate(() => document.documentElement.offsetHeight);
  await page.setViewport({width: 1665, height: height});
  const screenshot = await page.screenshot({ fullPage: true, path: 'screenshot.png', encoding: 'binary' });

  await browser.close();

  // Upload the file to Slack
  const result = await web.files.upload({
    filename: 'screenshot.png',
    file: fs.createReadStream('screenshot.png'),
    channels: 'general',
    title: 'Daily Delivery Log - June 9, 2023',
    initial_comment: 'Turner 11 - June 9, 2023',
  });

  // Delete the local screenshot file
  fs.unlinkSync('screenshot.png');

  console.log('Screenshot created and sent to Slack');
}

createScreenshotAndSendToSlack().catch(console.error);

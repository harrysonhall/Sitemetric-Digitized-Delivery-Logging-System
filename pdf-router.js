const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const { WebClient } = require('@slack/web-api');

// Initialize the Slack Web API client
const web = new WebClient('xoxb-5377527789442-5362998249047-tdd4gIRBr6xNDtmC5r4PrX7o');






// For opening a PDF within the users browser
router.get('/pdf', async (request, response) => {

	const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

	await page.setViewport({width: 1500, height: 1000});

	await page.goto('https://cryptic-headland-11431-325b3506e0ae.herokuapp.com', {waitUntil: 'networkidle0'});

    const height = await page.evaluate(() => document.documentElement.offsetHeight);

    const pdf = await page.pdf({
		height: `${height}px`,
        printBackground: true,
        width: '2000px'
    });

	await browser.close();

	response.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
    response.send(pdf)

	console.log('sending PDF');

})








// For pushing a PDF to Slack
router.get('/pdf-to-slack', async (request, response) => {


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


	response.send('PDF created and sent to Slack');
})













// For pushing a Screenshot to Slack
router.get('/screenshot-to-slack', async (request, response) => {


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

    response.send('Screenshot created and sent to Slack');
})






module.exports = router
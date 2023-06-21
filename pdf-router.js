const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

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

module.exports = router
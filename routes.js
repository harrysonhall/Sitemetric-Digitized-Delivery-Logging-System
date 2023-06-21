const express = require('express');
const router = express.Router();
const Model = require('./model');

// Remember, this is a file used for handling all request that are
// made to the '/entries' endpoint.
// 
// We will be accepting the following types HTTP requests:
// - 'GET'
// - 'POST'
// - 'PUT'
// - 'DELETE'

// We will have the following routes for each type of HTTP request:
// - 'GET' - '/' - Get all entries.
// - 'POST' - '/' - Post a new entry.
// - 'PATCH' - '/:id' - Update an existing entry.
// - 'DELETE' - '/:id' - Delete an existing entry.


// - 'GET' - '/' - Get all entries.
router.get('/', async (request, response) => {

	try {
		const entries = await Model.find();
		
		response.status(200).send(entries);
		console.log('GET Request successful. Entries have been sent.');

	} catch(error) {

		response.status(500).send();
		console.log('GET Request unsuccessful.');
		console.error(error);
	}
	
});


// - 'POST' - '/' - Post a new entry.
router.post('/', async (request, response) => {
	console.log('POST Request received. Now Processing.')
	
	try {
		const newEntry = new Model(request.body);
		await newEntry.save();

		response.status(201).send(newEntry);
		console.log('POST Request successful. New Entry has been posted to the database.')

	} catch(error) {

		response.status(500).send();
		console.log('POST Request unsuccessful.')
		console.error(error);
	}     
});


// - 'PATCH' - '/:id' - Update an existing entry.
router.patch('/:entryid', async (request, response) => {

	try {

		const entry = await Model.findById(request.params.entryid );

		if(request.body.site				!== undefined) entry.site				= request.body.site;
		if(request.body.couriercompany 		!== undefined) entry.couriercompany 	= request.body.couriercompany;
		if(request.body.cargo 				!== undefined) entry.cargo 				= request.body.cargo;
		if(request.body.arrivaltime 		!== undefined) entry.arrivaltime 		= request.body.arrivaltime;
		if(request.body.departuretime 		!== undefined) entry.departuretime 		= request.body.departureTime;
		if(request.body.gate 				!== undefined) entry.gate 				= request.body.gate;
		if(request.body.couriername			!== undefined
		&& request.body.couriername.first 	!== undefined) entry.couriername.first	= request.body.couriername.first;
		if(request.body.couriername			!== undefined
		&&	request.body.couriername.last	!== undefined) entry.couriername.last	= request.body.couriername.last;

		await entry.save();

		response.status(204).send();
		console.log('PATCH Request successful. Entry has been updated on the database.');

	} catch(error) {

		response.status(500).send();
		console.log('PATCH Request unsuccessful.');
		console.error(error)

	}
});


// - 'DELETE' - '/:id' - Delete an existing entry.
router.delete('/:entryid', async (request, response) => {

	try {

		const entry = await Model.findById(request.params.entryid);
		entry.deleteOne();

		response.status(204).send('Deletion successful');
		console.log('DELETE Request successful. Entry has been removed from the database.')

	} catch(error) {

		response.status(500).send();
		console.log('DELETE Request unsuccessful.');
		console.error(error);

	}
});

module.exports = router
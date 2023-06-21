const mongoose = require('mongoose');
const Schema = mongoose.Schema

const entrySchema = new Schema({

	site: String,
	date: String,
	couriercompany: String,
	cargo: String,
	arrivaltime: String,
	departuretime: String,
	gate: String,
	couriername: {
		first: String,
		last: String
	}
})

module.exports = mongoose.model('Entry', entrySchema);
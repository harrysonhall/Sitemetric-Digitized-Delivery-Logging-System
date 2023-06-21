// Imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

	const router = require('./routes');

// Create and call a function to connect to the MongoDB Atlas Database
const connectDatabase = async () => {
	try {
		const conn = await mongoose.connect('mongodb+srv://user:password12345@dailydeliverylog.s5alhqs.mongodb.net/?retryWrites=true&w=majority');
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	}
	catch(error) {
		console.log(`MongoDB was to establish connection: ${error}`)
	}
}
connectDatabase();

// Start express
const app = express();

// Tell express where to serve static files from
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all resources on the server
app.use(cors())

// Parse incoming JSON data
app.use(express.json());

// Route any requests made to the '//06092023/turner11' endpoint, to the router file
app.use('/entries/06092023/turner11', router)



// Start server on port 3000
app.listen(3000, () => {
	console.log('Server is running on port 3000');
})
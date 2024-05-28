const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/pindie';

async function connectToDatabase() {
	try {
		await mongoose.connect(DB_URL);
		console.log('database succesfuly connected');
	} catch (err) {
		console.log('database connection error');
		console.error(err);
	}
}

module.exports = connectToDatabase;
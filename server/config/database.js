const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_NAME = process.env.DATABASE_NAME || 'graphql';
const DATABASE_PORT = process.env.DATABASE_PORT || 27017;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:${DATABASE_PORT}/${DATABASE_NAME}`);
        console.log(`Connected to ${DATABASE_NAME} database on port ${DATABASE_PORT}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
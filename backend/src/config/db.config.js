const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 18) {
            console.error('Authentication failed - Please check your username and password');
        } else if (error.name === 'MongoServerSelectionError') {
            console.error('Unable to connect to MongoDB - Please check if your IP is whitelisted');
        } else {
            console.error('MongoDB connection error:', error.message);
        }
        process.exit(1);
    }
}

module.exports = connectDB;
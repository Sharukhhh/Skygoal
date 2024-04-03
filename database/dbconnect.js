import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoURL = process.env.MONGO_CONNECT_URL;


const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to database');
    } catch (error) {
        console.log(error, 'database connection error');
    }
}

export default connectDatabase;
import express from 'express'
const app = express();
import morgan from 'morgan'
import connectDb from './database/dbconnect.js';
import userRoutes from './routes/userRoutes.js';
import {errorHandler} from './middlewares/errorHandler.js'


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/user' , userRoutes);

app.use(errorHandler);

//Activating  Database connection to server
connectDb();


app.listen(5000 , () => {
    console.log('Server running successfully');
})
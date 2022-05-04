import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js'


// dotenv config
dotenv.config();

// db connection
connectDB();

// express app
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// cors => Cross Origin Resource Sharing
app.use(cors())

// app.use('/', (req, res) => {
//     res.send("welcome")
// })

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


app.use(errorHandler);
app.use(notFound);


// app port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgYellow.bold);
})
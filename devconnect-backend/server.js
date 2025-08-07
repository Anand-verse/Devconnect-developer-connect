import { log } from 'console';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';


dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000; 

app.get('/' , (req , res) => {
    res.send('API is running...');
});

mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT , ()=> console.log(`server is running on PORT:${PORT}`));
})
.catch(err => console.log(err));

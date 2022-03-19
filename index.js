const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose'); 
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');

//environment variable or you can say constants
env.config();

//DB Connection
const Connection = async () => {
    try {   
        await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
}
Connection();
app.use(cors());
app.use(express.json());
app.use('/api',authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT} `);
});
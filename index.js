const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//routes
const authRoutes = require('./routes/auth');


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

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//my routes
app.use('/api',authRoutes);

//starting a server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
const express = require('express');
const app = express();
const port = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const userRoute = require('./routers/users');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {
        console.log("Connected to MongoDB");
});

//midleware
app.use(express.json());
app.use(helmet());

app.use('/api/users-table/', userRoute);

app.listen(port, () => console.log(`Backend server is listening at http://localhost:${port}`));

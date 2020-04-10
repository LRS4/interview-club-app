const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, () => { }, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB database connection established successfully');
    })
    .catch(err => {
        console.log(err);
    });

mongoose.connection.on('error', err => console.log(err)); // checks for errors

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
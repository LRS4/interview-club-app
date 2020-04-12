const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

// Open mongoose connection
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

// Import defined routes
const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');

// Use defined routes
app.use('/questions', questionsRouter);
app.use('/users', usersRouter);

// Deployment step
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
}

// Listen on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
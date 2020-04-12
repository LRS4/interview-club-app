const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load local environment variables if not production
// https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config() 
}

// Set port for prod or local dev
const app = express();
const port = process.env.PORT || 5000;

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

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
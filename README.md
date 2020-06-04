# Interview Club App

## About

The first rule of Interview Club is that you don't talk about interview club! This app is a sharing platform where questions and answers to interview questions can be posted, answered, rated and searched for. It will be a simple CRUD application that uses React as the frontend with MongoDB and Express for the backend server and APIs.

## Build

The application will be built using the MERN stack - this interested me as I wanted to learn more about NoSQL databases and also React for front-end development.

* MongoDB
* Express
* React
* Nodejs

## Running the application

Install packages
```
npm install
```

Run Express server
```
nodemon server
```

Run React app
```
cd client
npm start
```

Environment variables
* Create .env file
* ATLAS_URI = the MongoDB Atlas connection string
* NODE_ENV = 'production' or 'deployment' Express settings
* REACT_APP_LOCAL_API_ENDPOINT = 'http://localhost:5000' to seperate production and development environments

## Packages used

Create React App, React Router
```
npm install -g create-react-app
npx create-react-app
npm install react-router-dom
```

Nodemon
* Automatically restarts application/server when changes in the directory are detected
```
npm install -g nodemon
```

Express, Mongoose, CORS and Dotenv
```
npm install express mongoose cors dotenv
```

MDBootstrap
```
npm install mdbreact
```

Axios - to send HTTP requests to API
```
npm install axios
```

Node SASS and Moment.js
```
npm install node-sass
npm install moment
```

## Tools used

* Postman - to test API calls
* MongoDB Atlas and Compass
* VS Code
* [Bcrypt](https://www.npmjs.com/package/bcryptjs)

## References

* [MERN App](https://www.youtube.com/watch?v=7CqJlxBYj-M)
* [Npm](https://www.npmjs.com/get-npm)
* [React](https://reactjs.org/tutorial/tutorial.html)
* [MongoDB](https://www.mongodb.com/)
* [Nodejs](https://github.com/nodejs/node-gyp#on-windows)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [MDBootstrap](https://mdbootstrap.com/docs/react/getting-started/quick-start/)
* [Deployment](https://coursework.vschool.io/deploying-mern-with-heroku/)
* [JWT Authorisation Tutorial](https://www.youtube.com/watch?v=USaB1adUHM0)

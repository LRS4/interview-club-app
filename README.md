# Interview Club App

## About

The first rule of Interview Club is that you don't talk about interview club! This app is a sharing platform where questions and answers to interview questions can be posted, answered, rated and searched for. It will be a simple CRUD application aimed at delivering this sole objective.

## Build

The application will be built using the MERN stack - this interested me as I wanted to learn more about NoSQL databases and also React for front-end development.

* MongoDB
* Express
* React
* Nodejs
* GraphQL

## Packages used

* npm init -y
* graphql-yoga
* create-react-app
* react-apollo
* npm install apollo-boost @apollo/react-hooks graphql
* mongo: C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe

## References

* https://www.youtube.com/watch?v=rpJO0T08Bnc
* https://www.npmjs.com/get-npm
* https://www.mongodb.com/
* https://github.com/nodejs/node-gyp#on-windows
* https://www.apollographql.com/docs/graphql-tools/generate-schema/

## Model Outline

Question:
* id;
* name;
* count; (I was also asked this!)
* sectors; (dropdown)
* vacancy_titles;
* difficult_rating;
* date_submitted;	

Answer:
* id;
* body;
* upvote;
* downvote;
* sector;
* vacancy_title;
* date_submitted;
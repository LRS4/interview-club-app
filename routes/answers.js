const router = require('express').Router();
const mongoose = require('mongoose');
let AnswerSchema = require('../models/answer.model');
let Question = require('../models/question.model');
let Answer =  mongoose.model('Answer', AnswerSchema);

// Add an answer to a question by question id   
router.route('/add/:qid').post((request, response) => {
    const username = request.body.username;
    const text = request.body.text;
    const job = request.body.job;
    const sector = request.body.sector;
    const company = request.body.company;
    
    const newAnswer = new Answer({
        username,
        text,
        job,
        sector,
        company
    });

    Question.findById(request.params.qid)
        .then(question => {
            question.answers.push(newAnswer);

            question.save()
                .then(() => response.status(200).json(newAnswer))
                .catch(err => response.status(400).json('Error: '+ err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// Get single answer of a question
router.route('/:qid/:id').get((request, response) => {
    Question.findById(request.params.qid)
        .then((question) => {
            let answer = question.answers.id(request.params.id);
            return response.json(answer);
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// Delete an answer by finding question by qid then answer subdoc
// https://mongoosejs.com/docs/subdocs.html
router.route('/:qid/:id').delete((request, response) => {
    Question.findById(request.params.qid)
        .then((question) => {
            question.answers.id(request.params.id).remove();

            question.save()
                .then(() => response.json('Answer removed.'))
                .catch(err => response.status(400).json('Error' + err));1
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// Update an answer by question id and answer id
router.route('/update/:qid/:id').put((request, response) => {
    Question.findById(request.params.qid)
        .then(question => {
            let answer = question.answers.id(request.params.id);
            answer.text = request.body.text;
            answer.job = request.body.job;
            answer.sector = request.body.sector;
            answer.company = request.body.company;

            question.save()
                .then(() => response.json('Answer updated.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// Vote for an answer
router.route('/vote/:qid/:id/:uid').put((request, response) => {
    Question.findById(request.params.qid)
        .then(question => {
            let answer = question.answers.id(request.params.id);

            if (answer.voters.some(voter => voter == request.params.uid)) {
                return response.json('User already voted.');
            } else {
                answer.votes = answer.votes + 1;
                answer.voters.push(request.params.uid);
            }

            question.save()
                .then(() => response.json('Answer vote counted.'))
                .catch(err => res.status(400).json('Error: '+ err));
        });
});

module.exports = router;
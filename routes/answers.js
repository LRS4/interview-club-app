const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
let AnswerSchema = require('../models/answer.model');
let Question = require('../models/question.model');
let Answer =  mongoose.model('Answer', AnswerSchema);

// @route   POST answers/add/:qid
// @desc    Add an answer to a question by question id 
// @access  Private 
router.route('/add/:qid').post(auth, (request, response) => {
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

// @route   GET answers/:qid/:id
// @desc    Get a single answer to a question
// @access  Private 
router.route('/:qid/:id').get(auth, (request, response) => {
    Question.findById(request.params.qid)
        .then((question) => {
            let answer = question.answers.id(request.params.id);
            return response.json(answer);
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// @route   DELETE answers/:qid/:id
// @desc    Delete an answer by finding question by qid then answer subdoc
// @see     https://mongoosejs.com/docs/subdocs.html
// @access  Private 
router.route('/:qid/:id').delete(auth, (request, response) => {
    Question.findById(request.params.qid)
        .then((question) => {
            question.answers.id(request.params.id).remove();

            question.save()
                .then(() => response.json('Answer removed.'))
                .catch(err => response.status(400).json('Error' + err));1
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// @route   PUT answers/update/:qid/:id
// @desc    Update an answer by question id and answer id
// @access  Private 
router.route('/update/:qid/:id').put(auth, (request, response) => {
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

// @route   PUT answers/vote/:qid/:id/:uid
// @desc    Upvote an answer with question and user id
// @access  Private 
router.route('/vote/:qid/:id/:uid').put(auth, (request, response) => {
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
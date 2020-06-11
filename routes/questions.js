const router = require('express').Router();
const auth = require('../middleware/auth');
let Question = require('../models/question.model');

// @route   GET questions
// @desc    Get all questions
// @access  Public
router.route('/').get((req, res) => {
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST questions/add
// @desc    Add a question
// @access  Private
router.route('/add').post(auth, (req, res) => {
    const username = req.body.username;
    const text = req.body.text;
    const job = req.body.job;
    const sector = req.body.sector;
    const company = req.body.company;
    
    const newQuestion = new Question({
        username,
        text,
        job,
        sector,
        company
    });

    newQuestion.save()
        .then(() => res.status(200).json(newQuestion))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET questions/:id
// @desc    Find question by id
// @access  Public
router.route('/:id').get((request, response) => {
    Question.findById(request.params.id)
        .then(question => response.json(question))
        .catch(err => response.status(400).json('Error: ' + err));
});

// @route   DELETE questions/:id
// @desc    Delete a quesiton by id
// @access  Private
router.route('/:id').delete(auth, (request, response) => {
    Question.findByIdAndDelete(request.params.id)
        .then(() => response.json('Question deleted.'))
        .catch(err => response.status(400).json('Error: ' + err));
});

// @route   PUT questions/:id
// @desc    Update a question by id
// @access  Private
router.route('/update/:id').put(auth, (request, response) => {
    Question.findById(request.params.id)
        .then(question => {
            question.username = request.body.username; 
            question.text = request.body.text;
            question.job = request.body.job;
            question.sector = request.body.sector;
            question.company = request.body.company;

            question.save()
                .then(() => response.json('Question updated.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// @route   PUT questions/vote/:id/:uid
// @desc    Allows user to upvote a question
// @access  Private
router.route('/vote/:id/:uid').put(auth, (request, response) => {
    Question.findById(request.params.id)
        .then(question => {
            if (question.voters.some(voter => voter == request.params.uid)) {
                return response.json('User already voted.');
            } else {
                question.votes = question.votes + 1;
                question.voters.push(request.params.uid);
            }

            question.save()
                .then(() => response.json('Question vote counted.'))
                .catch(err => res.status(400).json('Error: '+ err));
        });
});

module.exports = router;
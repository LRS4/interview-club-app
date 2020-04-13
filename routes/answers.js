const router = require('express').Router();
const mongoose = require('mongoose');
let AnswerSchema = require('../models/answer.model');
let Question = require('../models/question.model');
let Answer =  mongoose.model('Answer', AnswerSchema);

// Add answer by finding question by id     
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
                .then(() => response.json('Answer added.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

// Find question by qid then answer subdoc by id and delete it
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

router.route('/update/:id').put((request, response) => {
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

module.exports = router;
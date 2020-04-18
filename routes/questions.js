const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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
        .then(() => res.json('Question added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((request, response) => {
    Question.findById(request.params.id)
        .then(question => response.json(question))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').delete((request, response) => {
    Question.findByIdAndDelete(request.params.id)
        .then(() => response.json('Question deleted.'))
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

router.route('/vote/:id/:uid').put((request, response) => {
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
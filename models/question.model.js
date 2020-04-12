const mongoose = require('mongoose');
let Answer = require('./answer.model');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    job: { type: String, required: true },
    sector: { type: String, required: true },
    company: { type: String, required: false },
    votes: { type: Number, required: false, default: 0 },
    answers: { type: [Answer], required: false, default: [] }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
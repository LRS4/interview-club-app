const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    job: { type: String, required: true },
    answers: { type: Array, required: false, default: [] }
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
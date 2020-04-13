const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    job: { type: String, required: true },
    sector: { type: String, required: true },
    company: { type: String, required: false },
    votes: { type: Number, required: false, default: 0 }
}, {
    timestamps: true
});

module.exports = answerSchema;
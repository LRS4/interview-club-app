import axios from 'axios';
var moment = require('moment');

const REQUESTING_QUESTIONS = 'REQUESTING_QUESTIONS';
const REQUESTING_QUESTIONS_ERROR = 'REQUESTING_QUESTIONS_ERROR';
const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
const ADD_QUESTION = 'ADD_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';

export function getAllQuestions() {
    return (dispatch, getState) => {
        dispatch({ type: REQUESTING_QUESTIONS });
        axios.get('/questions')
		.then(response => {
			let sortedQuestions = response.data.sort((a, b) => {
				return (
					moment().diff(moment(a.createdAt), 'minutes', false) -
					moment().diff(moment(b.createdAt), 'minutes', false)
				)
            });
            dispatch({ type: RECEIVED_QUESTIONS, questions: sortedQuestions });
		})
		.catch(error => {
            let message = String(error);
            dispatch({ type: REQUESTING_QUESTIONS_ERROR, error: message });
		});
    }
}

export function addQuestion(question) {
    return (dispatch, getState) => {
        // make call to api
        dispatch({ type: ADD_QUESTION, question });
    };
}

export function removeQuestion(question) {
    return {
        type: REMOVE_QUESTION,
        question
    };
}
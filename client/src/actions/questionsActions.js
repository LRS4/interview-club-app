import axios from 'axios';
var moment = require('moment');

const REQUESTING_QUESTIONS = 'REQUESTING_QUESTIONS';
const REQUESTING_QUESTIONS_ERROR = 'REQUESTING_QUESTIONS_ERROR';
const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
const ADD_QUESTION = 'ADD_QUESTION';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const REMOVE_ANSWER = 'REMOVE_ANSWER';

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
    return (dispatch) => {
        axios.post('/questions/add', question)
            .then(result => {
                console.log(result.data);
                dispatch({ type: ADD_QUESTION, question: result.data });
            })
            .catch(err => console.log("Error: " + err));
    };
}

export function removeQuestion(questionId) {
    return (dispatch) => {
        axios.delete('/questions/' + questionId)
            .then(response => {
                console.log(response);
                dispatch({ type: REMOVE_QUESTION, questionId});
            })
            .catch(err => console.log(err));
    }
}

export function updateQuestion(id, question) {
    return (dispatch) => {
        axios.put('/questions/update/' + id, question)
            .then(result => {
                console.log(result.data);
                dispatch({ type: UPDATE_QUESTION, id, question });
            })
            .catch(err => console.log("Error: " + err)); 
    }
}

export function removeAnswer(qid, id) {
    return (dispatch) => {
        axios.delete(`/answers/${qid}/${id}`)
            .then(response => {
                console.log(response);
                dispatch({ type: REMOVE_ANSWER, qid, id });
            })
            .catch(err => console.log("Error: " + err)); 
    }
}
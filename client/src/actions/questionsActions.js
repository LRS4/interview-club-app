import axios from 'axios';
import { tokenConfig } from '../actions/authActions';
import { returnErrors } from '../actions/errorActions';
import {
    REQUESTING_QUESTIONS,
    REQUESTING_QUESTIONS_ERROR,
    RECEIVED_QUESTIONS,
    ADD_QUESTION,
    REMOVE_QUESTION,
    UPDATE_QUESTION,
    UPVOTE_QUESTION,
    ADD_ANSWER,
    UPDATE_ANSWER,
    REMOVE_ANSWER
} from '../constants/actionTypes';
var moment = require('moment');

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
        axios.post('/questions/add', question, tokenConfig(getState))
            .then(result => {
                console.log(result.data);
                dispatch({ type: ADD_QUESTION, question: result.data });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    };
}

export function removeQuestion(questionId) {
    return (dispatch, getState) => {
        axios.delete('/questions/' + questionId, tokenConfig(getState))
            .then(response => {
                console.log(response);
                dispatch({ type: REMOVE_QUESTION, questionId});
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
}

export function updateQuestion(id, question) {
    return (dispatch, getState) => {
        axios.put('/questions/update/' + id, question, tokenConfig(getState))
            .then(result => {
                console.log(result.data);
                dispatch({ type: UPDATE_QUESTION, id, question });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
}

export function upvoteQuestion(qid, uid) {
    return (dispatch, getState) => {
        axios.put(`questions/vote/${qid}/${uid}`, null, tokenConfig(getState))
            .then(result => {
                console.log(result.data);
                dispatch({ type: UPVOTE_QUESTION, qid, uid });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
}

export function addAnswer(qid, answer) {
    return (dispatch, getState) => {
        axios.post(`/answers/add/${qid}`, answer, tokenConfig(getState))
            .then(result => {
                console.log(result.data);
                dispatch({ type: ADD_ANSWER, qid, answer: result.data });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    };
}

export function updateAnswer(qid, id, answer) {
    return (dispatch, getState) => {      
        axios.put(`/answers/update/${qid}/${id}`, answer, tokenConfig(getState))
            .then(result => {
                console.log(result.data);
                dispatch({ type: UPDATE_ANSWER, qid, id, answer });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
}

export function removeAnswer(qid, id) {
    return (dispatch, getState) => {
        axios.delete(`/answers/${qid}/${id}`, tokenConfig(getState))
            .then(response => {
                console.log(response);
                dispatch({ type: REMOVE_ANSWER, qid, id });
            })
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
}
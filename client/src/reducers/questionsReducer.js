var moment = require('moment');

const initialState = {
    error: null,
    fetching: true,
    questions: []
}

const questionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REQUESTING_QUESTIONS':
            return {
                ...state,
                fetching: true,
                questions: []
            }
        case 'RECEIVED_QUESTIONS':
            return {
                ...state,
                fetching: false,
                questions: action.questions
            }
        case 'REQUESTING_QUESTIONS_ERROR':
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: [...state.questions, action.question].sort((a, b) => {
                    return (
                        moment().diff(moment(a.createdAt), 'minutes', false) -
                        moment().diff(moment(b.createdAt), 'minutes', false)
                    )
                })
            }
        default:
            return state;
    }
}

export default questionsReducer;


// const testState = {
//     questions: [{
//         _id: '5e962cfc12fc9c474c9a8d86',
//         text: 'Hello',
//         username: 'Lewis',
//         job: 'Job',
//         sector: 'Manufacturing', 
//         answers: [],
//         votes: 5,
//         voters: [],
//         createdAt: "2020-04-14T21:37:00.368Z",
//         updatedAt: "2020-04-14T21:37:52.276Z"
//     }]
// };
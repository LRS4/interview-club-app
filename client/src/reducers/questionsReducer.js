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
                questions: [action.question, ...state.questions]
            }
        case 'REMOVE_QUESTION':
            return {
                ...state,
                questions: [...state.questions].filter(question => question._id !== action.questionId)
            }
        case 'UPDATE_QUESTION':
            return {
                ...state,
                questions: [...state.questions].map(question => (
                    question._id === action.id 
                    ? {
                        ...question,
                        text: action.question.text,
                        job: action.question.job,
                        sector: action.question.sector,
                        company: action.question.company
                    } 
                    : question
                ))
            }
        case 'UPVOTE_QUESTION':
            return {
                ...state,
                questions: [...state.questions].map(question => (
                    question._id === action.qid
                    ? {
                        ...question,
                        votes: question.votes + 1,
                        voters: [action.uid, ...question.voters]
                    }
                    : question
                ))
            }
        case 'ADD_ANSWER':
            return {
                ...state,
                questions: [...state.questions].map(question => (
                    question._id === action.qid
                    ? {
                        ...question,
                        answers: [action.answer, ...question.answers]
                    }
                    : question
                ))
            }
        case 'UPDATE_ANSWER':
            return {
                ...state,
                questions: [...state.questions].map(question => (
                    question._id === action.qid 
                    ? {
                        ...question,
                        answers: [...question.answers].map(answer => (
                            answer._id === action.id
                            ? {
                                ...answer,
                                text: action.answer.text,
                                job: action.answer.job,
                                sector: action.answer.sector,
                                company: action.answer.company
                            }
                            : answer
                        ))
                    }
                    : question
                ))
            }
        case 'REMOVE_ANSWER':
            return {
                ...state,
                questions: [...state.questions].map(question => (
                    question._id === action.qid
                    ? {
                        ...question,
                        answers: [...question.answers].filter(answer => answer._id !== action.id)
                    }
                    : question
                ))
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
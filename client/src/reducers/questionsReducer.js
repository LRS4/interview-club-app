const initialState = {
    questions: [{
        _id: '1',
        text: 'Hello',
        username: 'Lewis',
        job: 'Job',
        sector: 'Manufacturing', 
        answers: [],
        votes: 5,
        voters: [],
        createdAt: "2020-04-14T21:37:00.368Z",
        updatedAt: "2020-04-14T21:37:52.276Z"
    }]
};

const questionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_QUESTION':
            return [...state, action.question];
        default:
            return state;
    }
}

export default questionsReducer;
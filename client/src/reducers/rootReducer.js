import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


const rootReducer = combineReducers({
    questions: questionsReducer,
    error: errorReducer,
    auth: authReducer
});

export default rootReducer;
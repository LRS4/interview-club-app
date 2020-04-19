export function addQuestion(question) {
    return {
        type: 'ADD_QUESTION',
        question
    };
}

export function removeQuestion(question) {
    return {
        type: 'REMOVE_QUESTION',
        question
    };
}
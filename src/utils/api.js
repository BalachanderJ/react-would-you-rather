import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA.js'

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => {
        console.log('questions', questions);
            return ({
                users,
                questions
            })
        }
    )
}

export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
}

export function saveQuestion (info) {
    return _saveQuestion(info)
}

export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}
import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receive_users } from './users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'


export function receive_questions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(text1, text2) {
    return (dispatch, getState) => {
        const { autheduser } = getState()
        dispatch(showLoading())
        return saveQuestion ({
            optionOneText: text1,
            optionTwoText: text2,
            author: autheduser
        }).then((res) => {
            dispatch(addQuestion(res.formattedQuestion))
            dispatch(receive_users(res.users))
            dispatch(hideLoading())
        })
    }
}
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receive_users } from './users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION';


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

export function answerQuestion(authedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer,
    };
}

export function handleAnswerQuestion(authedUser, qid, answer) {
    return function(dispatch) {
        const answerInfo = {
            authedUser,
            qid,
            answer,
        };

        return saveQuestionAnswer(answerInfo)
            .then(function(res) {
                dispatch((answerQuestion(authedUser, qid, answer)))
                dispatch(receive_users(res.users))
                dispatch(receive_questions(res.questions))
            })
    }
}
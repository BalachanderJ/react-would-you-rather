import { getInitialData } from '../utils/api'
import { receive_users } from './users'
import { receive_questions } from './questions'
import { receive_auth_user } from './autheduser'
import { showLoading, hideLoading } from 'react-redux-loading'


const autheduser = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        getInitialData().then(({users, questions}) => {
            dispatch(receive_users(users))
            dispatch(receive_questions(questions))
            dispatch(receive_auth_user(autheduser))
            dispatch(hideLoading())
        })
    }
}
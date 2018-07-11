import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import autheduser from './autheduser'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    users,
    questions,
    autheduser,
    loadingBar: loadingBarReducer
})

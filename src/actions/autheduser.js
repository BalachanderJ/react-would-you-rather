import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_AUTH_USER = 'RECEIVE_AUTH_USER'

export function receive_auth_user(user) {
    return {
        type: RECEIVE_AUTH_USER,
        user
    }

}

export function handleSetAuthUser(user) {
    return (dispatch, getState) => {
        dispatch(showLoading())
        dispatch(receive_auth_user(user))
        dispatch(hideLoading())
    }
}
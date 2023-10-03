// redux/actions/useAction.js

export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = (userData) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: userData,
    };
};
export const doLogin = (userData) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: userData,
    };
};

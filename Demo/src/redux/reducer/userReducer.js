// redux/reducers/userReducer.js

import { FETCH_USER_LOGIN_SUCCESS } from '../action/useAction';

const initialState = {
    currentUser: null,
    isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default userReducer;

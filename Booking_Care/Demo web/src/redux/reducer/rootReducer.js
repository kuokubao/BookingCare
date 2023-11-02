// redux/reducers/rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import userReducer

const rootReducer = combineReducers({
    userReducer, // Thêm userReducer vào rootReducer
    // ... Other reducers (nếu có)
});

export default rootReducer;

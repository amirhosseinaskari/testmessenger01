import { combineReducers } from '@reduxjs/toolkit';
import messageReducer from './messages';
import messageInfoReducer from './messegeInfo'
export default combineReducers({
    messages: messageReducer.reducer,
    messageInfo: messageInfoReducer.reducer
});
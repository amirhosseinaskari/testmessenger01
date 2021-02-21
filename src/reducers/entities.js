import { combineReducers } from '@reduxjs/toolkit';
import messageReducer from './messages';
import chatReducer from './chats'
export default combineReducers({
    messages: messageReducer.reducer,
    chats: chatReducer.reducer
});
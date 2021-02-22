import {createSlice} from '@reduxjs/toolkit';
/**
 * this reducer created for showing messages at 
 * the message box, add new messages and handling other states of messages within a chatroom.
 */
const messageReducer = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        messageBoxChanged: (messages, action) => {
          // messages = [...action.payload.messages];
           return [...action.payload.messages];
        }
    }
});

export default messageReducer;
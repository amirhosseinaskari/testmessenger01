import {createSlice} from '@reduxjs/toolkit';
/**
 * this reducer is for show messages when a message at the message list is clicked.
 */
const messageReducer = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        messageBoxChanged: (messages, action) => {
            messages.push(action.payload.messages);
           console.log(action.payload.messages);
        }
    }
});

export default messageReducer;
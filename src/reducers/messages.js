import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
/**
 * this reducer created for showing messages at 
 * the message box, add new messages and handling other states of messages within a chatroom.
 */
const messageReducer = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        messageBoxChanged: (messages, action) => {
           messages = [...action.payload.messages];
           return messages;
        },
        messageAdded: (messages, action) => {
            messages.push({...action.payload.message});
        },
        messageDelete: (messages, action) => {
            messages.filter((item) => item.id === action.payload.id);
        },
        messageDeliveryStatus: (messages, action) => {
            const index = messages.findIndex((item) => item.id === action.payload.id);
            messages[index].isFailed = action.payload.isFailed;
            messages[index].isPending = false;
        }
    }
});

export default messageReducer;
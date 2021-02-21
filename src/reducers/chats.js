import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
/**
 * this reducer handles states of message list which are at the side bar.
 * chatStatus => 1: pending / 2: loaded / 3: failed
 */
const chatReducer = createSlice({
    name: 'chats',
    initialState: {
        isActive: false,
        chatStatus: -1,
        chatInfo: {
            avatar: '',
            bio: '',
            name: '',
            chatId: '',
            last_message: {
                from: "",
                chat: "",
                id: "",
                temp_id: "",
                body: "",
                create_datetime: ""
              }
        }
       
    },
    reducers: {
        chatSelected: (chats, action) => {
            
            chats.chatInfo = {...action.payload.chatInfo};
            chats.isActive = true;
           
        },
        chatStatusEdit: (chats, action) => {
            
            chats.chatStatus = action.payload.chatStatus;
            
        }
    }
});

export default chatReducer;
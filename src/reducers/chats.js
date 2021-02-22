import {createSlice} from '@reduxjs/toolkit';

/**
 * this reducer handles states of message list which are at the side bar.
 * chatStatus => 1: pending / 2: loaded / 3: failed
 */
const chatReducer = createSlice({
    name: 'chats',
    initialState: {
        isLogin: false,
        userId: '',
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
            chats.avatar = action.payload.avatar;
            chats.name = action.payload.name;
            
        },
        chatStatusEdit: (chats, action) => {
            chats.chatStatus = action.payload.chatStatus;
        },
        userLoggedIn: (chats, action) => {
            chats.userId = action.payload.userId;
        }
    }
});

export default chatReducer;
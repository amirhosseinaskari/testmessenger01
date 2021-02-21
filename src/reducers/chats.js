import {createSlice} from '@reduxjs/toolkit';
/**
 * this reducer handles states of message list which are at the side bar.
 * chatStatus => 1: pending / 2: loaded / 3: failed
 */
const chatReducer = createSlice({
    name: 'chats',
    initialState: {
        isActive: false,
        chatStatus: -1,
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
    },
    reducers: {
        chatSelected: (chats, action) => {
            chats = {...action.payload.messegeInfo, isActive: true}
        },
        chatStatusEdit: (chats, action) => {
            chats.chatStatus = action.payload.chatStatus;
            console.log(action.payload.chatStatus);
        }
    }
});

export default chatReducer;
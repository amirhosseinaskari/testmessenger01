import {createSlice} from '@reduxjs/toolkit';
/**
 * this reducer is for show messages when a message at the message list is clicked.
 */
const messageInfoReducer = createSlice({
    name: 'messageInfo',
    initialState: {
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
        messageSelected: (messages, action) => {
            messages = {...action.payload.messegeInfo}
        }
    }
});

export default messageInfoReducer;
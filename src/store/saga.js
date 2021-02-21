import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {store} from './store';
import axios from 'axios';
import messagesReducer from '../reducers/messages';
import chatReducer from '../reducers/chats'

function* fetchMessageList(action) {
    const messageList = yield axios({
        url: 'https://amir.com',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
            
        },
        data:{
            chatId: action.payload.chatId
        }
    }).then(res => res.data)
    .catch(() => {
        return ({
            chatId: 'xxx-xxx-xxx',
            messages: [
                {
                    userId: '12345678',
                    chatId: 'xxx-xxx-xxx',
                    body: 'this is sample text message',
                    createDate: '2021/01/23',
                    from: 'Amir Askari'
                 },
                 {
                    userId: '12342225678',
                    chatId: 'xxx-xxx-xxx',
                    body: 'this is sample text message',
                    createDate: '2021/01/23',
                    from: 'Dee Marin'
                 },
                 {
                    userId: '12345678',
                    chatId: 'xxx-xxx-xxx',
                    body: 'this is sample text message',
                    createDate: '2021/01/23',
                    from: 'Amir Askari'
                 }
        ]
        });
    }); 
    
    yield store.dispatch(messagesReducer.actions.messageBoxChanged({messages: messageList}));
    yield store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 2}));
}

function* watchMessageBoxChanged() {
    yield takeLatest(chatReducer.actions.chatSelected, fetchMessageList);
}

export default function* rootSaga() {
    yield all([
        watchMessageBoxChanged()
    ])
}
import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {store} from './store';
import axios from 'axios';
import messagesReducer from '../reducers/messages';
import messageInfoReducer from '../reducers/messegeInfo'

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
}

function* watchMessageBoxChanged() {
    yield takeLatest(messageInfoReducer.actions.messageSelected, fetchMessageList);
}

export default function* rootSaga() {
    yield all([
        watchMessageBoxChanged()
    ])
}
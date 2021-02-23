import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {store, getLastMessageId} from './store';
import axios from 'axios';
import messagesReducer from '../reducers/messages';
import chatReducer from '../reducers/chats'
import { act } from 'react-dom/test-utils';
import messageReducer from '../reducers/messages';
/**
 * 
 * @param {action} action 
 * fetch message list of a chatroom when the chatroom clicked
 */
function* fetchMessageList(action) {
    const messageList = yield new Promise((resolve,reject) => {
        //if the api resopons is ok
        resolve();
        //if the api resopons is not ok
        //reject();
    })
    .then(res => ( 
        [{
            id: 1,
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 01',
            createDate: '2021/01/23',
            isPending: false,
            isSeen: true,
            isDelivered: true,
            from: 'Amir Askari'
         },
         {
            id: 2,
            userId: '12342225678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 02',
            createDate: '2021/01/23',
            isSeen: true,
            isPending: false,
            isDelivered: true,
            from: 'Dee Marin'
         },
         {
            id: 3,
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 03',
            createDate: '2021/01/23',
            isSeen: false,
            isPending: false,
            isDelivered: true,
            from: 'Amir Askari'
         },
         {
            id: 4,
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 03',
            createDate: '2021/01/23',
            isSeen: false,
            isPending: false,
            isDelivered: false,
            from: 'Amir Askari'
         }]))
    .catch(() => {
        return null;
    }); 
    if(!messageList){
        store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 3}));
        return;
    }
    yield store.dispatch(messagesReducer.actions.messageBoxChanged({messages: messageList}));
    yield store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 2}));
    
}
/**
 * watch chatroom selected
 */
function* watchMessageBoxChanged() {

    yield takeLatest(chatReducer.actions.chatSelected, fetchMessageList);
}

export default function* rootSaga() {
    yield all([
        watchMessageBoxChanged()
    ])
}
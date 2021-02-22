import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {store} from './store';
import axios from 'axios';
import messagesReducer from '../reducers/messages';
import chatReducer from '../reducers/chats'

function* fetchMessageList(action) {
    const messageList = yield new Promise((resolve,reject) => {
        //if the api resopons is ok
        resolve();
        //if the api resopons is not ok
        //reject();
    })
    .then(res => ( 
        [{
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 01',
            createDate: '2021/01/23',
            isSeen: true,
            isDelivered: true,
            from: 'Amir Askari'
         },
         {
            userId: '12342225678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 02',
            createDate: '2021/01/23',
            isSeen: true,
            isDelivered: true,
            from: 'Dee Marin'
         },
         {
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 03',
            createDate: '2021/01/23',
            isSeen: false,
            isDelivered: true,
            from: 'Amir Askari'
         },
         {
            userId: '12345678',
            chatId: 'xxx-xxx-xxx',
            body: 'this is sample text message 03',
            createDate: '2021/01/23',
            isSeen: false,
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

function* watchMessageBoxChanged() {
    yield takeLatest(chatReducer.actions.chatSelected, fetchMessageList);
}


export default function* rootSaga() {
    yield all([
        watchMessageBoxChanged()
    ])
}
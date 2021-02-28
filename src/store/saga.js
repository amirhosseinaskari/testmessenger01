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
   
   
    store.dispatch(chatReducer.actions.chatStatusEdit({chatStatus: 3}));

    yield store.dispatch(messagesReducer.actions.messageBoxChanged({messages: []}));
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
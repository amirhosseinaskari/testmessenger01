import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from '../reducers/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer,
    middleware:[...getDefaultMiddleware({thunk: false}), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

/**Selectors */
export const getLastMessageId = () => {
    const messages = store.getState().entities.messages;
    const lastIndex = (messages[messages.length - 1]) ? (messages[messages.length - 1].id) : 0;
    return lastIndex;
};

export const getUserId = () => {
    const userId = store.getState().entities.chats.userId;
    return userId;
}

export const getChatId = () => {
    const chatId = store.getState().entities.chats.chatInfo.chatId;
    return chatId;
}

export const getMessageId = (reqId,reqTime) => {
    console.log(reqId, reqTime);
    const index = store.getState().entities.messages.findIndex(item => item.reqId === reqId && item.reqTime === reqTime);
    
    return index === -1 ? -1 : store.getState().entities.messages[index].id;
}

export const getMessageById = (id) => {
    const index = store.getState().entities.messages.findIndex(item => item.id === id);
    return index;
}
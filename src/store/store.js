import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from '../reducers/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import messageReducer from '../reducers/messages';

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
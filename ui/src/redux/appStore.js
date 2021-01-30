import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import infoXchange from './reducer/app.reducer';

export const store = createStore(
    infoXchange,
     applyMiddleware(
        thunk,
    )
);
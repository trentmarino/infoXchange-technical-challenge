import {combineReducers} from 'redux'
import {getBookId, getSavedStatus } from './book.reducer'

const infoXchange = combineReducers({
    getBookId,
    getSavedStatus
});

export default infoXchange
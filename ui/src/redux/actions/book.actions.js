import {bookConstant} from "../constants/book.constants";


export const setBookId = (bookId) => {
    return (dispatch) => {
        dispatch(addBookId(bookId));
    }
};

const addBookId = bookId => ({
    type: bookConstant.BOOK_ID,
    payload: bookId
});

export const setSavedStatus = (saved) => {
    return (dispatch) => {
        dispatch(addSavedStatus(saved));
    }
};

const addSavedStatus = saved => ({
    type: bookConstant.SAVED,
    payload: saved
});
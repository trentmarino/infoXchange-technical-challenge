import {bookConstant} from "../constants/book.constants";


export const getBookId = (state = {
    bookId: null
}, action) => {
    switch (action.type) {
        case bookConstant.BOOK_ID:
            return {
                ...state,
                bookId: action.payload
            };
        default:
            return state;
    }
}

export const getSavedStatus = (state = {
    saved: false
}, action) => {
    switch (action.type) {
        case bookConstant.SAVED:
            return {
                ...state,
                saved: action.payload
            };
        default:
            return state;
    }
}
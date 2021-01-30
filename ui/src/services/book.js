
import api from '../utils/api';

export const getBooks = async () => {
    const response =  await api.get('books/');
    return response.data.books;
}

export const getBook = async (id) => {
    const response =  await api.get(`book/${id}`);
    return response.data.book;
}

export const saveBook = async (data, id = undefined) => {
    let response;
    if(id) {
        response = await api.put(`book/${id}`, data);
    } else {
        response = await api.post(`book/`, data);
    }
    return response.data.book;
}
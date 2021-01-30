import {render, screen} from '@testing-library/react';
import BookList from "../components/BookList";
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

describe('List of books', () => {
    const initialState = {getSavedStatus: false}
    const mockStore = configureStore()
    let store = mockStore(initialState)
    render(<Provider store={store}><BookList/></Provider>)

    it('Show Add a new Book Button', () => {
        const linkElement = screen.getByText(/Add a new Book/i);
        expect(linkElement).toBeInTheDocument();
    })


});


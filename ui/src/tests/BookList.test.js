import {render, screen} from '@testing-library/react';
import BookList from "../components/BookList";
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

describe('List of books', () => {
    const initialState = {getSavedStatus: false}
    const mockStore = configureStore()
    let store = mockStore(initialState)


    it('I should see the Add a new Book Button', () => {
        render(<Provider store={store}><BookList/></Provider>)
        const linkElement = screen.getByText(/Add a new Book/i);
        expect(linkElement).toBeInTheDocument();
    })

    it('I should see the Add a new Book Button', () => {
        render(<Provider store={store}><BookList/></Provider>)
        const linkElement = screen.getByText(/Add a new Author/i);
        expect(linkElement).toBeInTheDocument();
    })

});


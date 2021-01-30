import React, {useEffect, useState} from "react";
import {Box, ListItem, List, Grid, Button} from "@material-ui/core";
import {getBooks} from "../services/book";
import {useDispatch, useSelector} from "react-redux";
import {setBookId as setReduxBookId, setSavedStatus} from "../redux/actions/book.actions";
import AddIcon from '@material-ui/icons/Add';

function BookList({props}) {

    const [books, setBooks] = useState([])
    const dispatch = useDispatch();
    const [bookId, setBookId] = useState(null)

    const savedBooks = useSelector(state => state.getSavedStatus.saved);


    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            setBooks(response)
            dispatch(setSavedStatus(false))
        }
        fetchBooks();
    }, [savedBooks, dispatch])


    const handleBookClick = (event, bookId) => {
        setBookId(bookId)
        dispatch(setReduxBookId(bookId))
    }

    return (
        <Box elevation={1} style={{
            height: '78vh'
        }}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" alignContent='center' justify='space-between'>
                        <Grid item>
                            <Button><AddIcon/> Add a new Book</Button>
                        </Grid>
                        <Grid item>
                            <Button><AddIcon/> Add a new Author</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <List component="nav">
                        {books.map(book => (
                            <ListItem style={{
                                backgroundColor: bookId === book.id ? '#e2e2e2' : 'inherit'
                            }} key={book.id} button onClick={(event) => handleBookClick(event, book.id)}>
                                {book.name}
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BookList


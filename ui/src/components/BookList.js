import React, {useEffect, useState} from "react";
import {Box, ListItem, List, Grid, Button, Divider, Snackbar} from "@material-ui/core";
import {getBooks, saveBook} from "../services/book";
import {useDispatch, useSelector} from "react-redux";
import {setBookId as setReduxBookId, setSavedStatus} from "../redux/actions/book.actions";
import AddIcon from '@material-ui/icons/Add';
import AddNewDialog from "./AddNewDialog";
import {saveAuthor} from "../services/author";
import MuiAlert from "@material-ui/lab/Alert";

function BookList({props}) {

    const [books, setBooks] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Created Successfully");
    const [dialogDetails, setDialogDetails] = useState({
        title: "",
        formType: "",
        onSave: null,
        dataStructure: {}
    })
    const [bookId, setBookId] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const dispatch = useDispatch();

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

    const closeDialog = (alert, message) => {
        if (alert) {
            setAlertMessage(message)
            setShowAlert(true);
        }

        setShowDialog(!showDialog)
    }

    const handleOpenDialog = (key) => {
        switch (key) {
            case "book":
                setDialogDetails({
                    ...dialogDetails,
                    title: "Add a new book",
                    formType: "book",
                    onSave: saveBook,
                    dataStructure: {
                        name: '',
                        isbn: '',
                        author_id: ''
                    }
                });
                break;
            case "author":
                setDialogDetails({
                    ...dialogDetails,
                    title: "Add a new Author",
                    formType: "author",
                    onSave: saveAuthor,
                    dataStructure: {
                        first_name: '',
                        last_name: ''
                    }
                });
                break;
            default:
                break;

        }
        setShowDialog(true);

    }


    return (
        <Box elevation={1} style={{
            height: '78vh'
        }}>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction="row" alignContent='center' justify='space-between'>
                        <Grid item>
                            <Button onClick={() => handleOpenDialog('book')}><AddIcon/> Add a new Book</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => handleOpenDialog('author')}><AddIcon/> Add a new Author</Button>
                        </Grid>
                    </Grid>
                    <Divider/>
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={showAlert}
                autoHideDuration={3000}
                onClose={() => setShowAlert(false)}>
                <MuiAlert onClose={() => setShowAlert(false)} severity="success">
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            {showDialog ? <AddNewDialog
                open={showDialog}
                title={dialogDetails.title}
                dataStructure={dialogDetails.dataStructure}
                formType={dialogDetails.formType} onSave={dialogDetails.onSave} onClose={closeDialog}/> : null}
        </Box>
    )
}

export default BookList


import React, {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    Divider, Grid,
    IconButton, TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getBook, saveBook} from "../services/book";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {saveAuthor} from "../services/author";
import {setSavedStatus} from "../redux/actions/book.actions";

function BookDetail({props}) {

    const [bookDetails, setBookDetails] = useState({});
    const [showAuthorEdit, setShowAuthorEdit] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(false);
    const [editingBook, setEditingBook] = useState(false);
    const [showBookEdit, setShowBookEdit] = useState(false);

    const bookId = useSelector(state => state.getBookId.bookId);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBookDetails = async () => {
            const response = await getBook(bookId);
            setBookDetails({...response});
        }
        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId])

    const handleChange = (value, key) => {
        const bookDetailsCopy = {...bookDetails};
        bookDetailsCopy[key] = value;
        setBookDetails({...bookDetailsCopy});
    }

    const handleAuthorChange = (value, key) => {
        const bookDetailsCopy = {...bookDetails};
        bookDetailsCopy.author[key] = value;
        setBookDetails({...bookDetailsCopy});
    }

    const handleSaveBook = async () => {
        dispatch(setSavedStatus(true));
        const formattedObject = {
            name: bookDetails.name,
            isbn: bookDetails.isbn,
            author_id: bookDetails.author.id
        };
        const response = await saveBook(formattedObject, bookId);
        setBookDetails({...response});
        setEditingBook(false);
        setEditingAuthor(false);

    }

    const handleSaveAuthor = async () => {
        const copyOfBookDetails = {...bookDetails}
        copyOfBookDetails.author = await saveAuthor(bookDetails.author, bookDetails.author.id)
        setBookDetails({...copyOfBookDetails})
        setEditingBook(false)
        setEditingAuthor(false)
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                {!editingBook ? <Grid container direction='row' onMouseEnter={() => setShowBookEdit(true)}
                                      onMouseLeave={() => setShowBookEdit(false)}>
                    <Grid>
                        <Typography variant={"h5"}>{bookDetails.name}</Typography>
                        <Typography variant="caption"><b>isbn:</b> {bookDetails.isbn}</Typography>
                    </Grid>
                    <Grid>
                        {showBookEdit ? <IconButton style={{
                            padding: 0
                        }} disableFocusRipple disableRipple size='small'
                                                    onClick={() => setEditingBook(true)}>
                            <EditIcon fontSize='small'/>
                        </IconButton> : null}
                    </Grid>
                </Grid> : (<Box>
                    <Grid container direction={"row"} spacing={1} alignContent="center">
                        <Grid item xs={4}>
                            <TextField value={bookDetails.name}
                                       onChange={(e) => handleChange(e.target.value, 'name')}
                                       label="Name"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={bookDetails.isbn}
                                       onChange={(e) => handleChange(e.target.value, 'isbn')}
                                       label="isbn"/>
                        </Grid>
                        <Grid item xs={4}>
                            <IconButton onClick={() => setEditingBook(false)}><CloseIcon/></IconButton>
                            <IconButton onClick={handleSaveBook}><CheckIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Box>)}
                <Divider/>
                {bookDetails.author ? <Box p={1}>
                    <Typography variant={"subtitle2"}>Author's Details</Typography>
                    {!editingAuthor ? (
                        <Box onMouseEnter={() => setShowAuthorEdit(true)}
                             onMouseLeave={() => setShowAuthorEdit(false)}>
                            {bookDetails.author.last_name}, {bookDetails.author.first_name}

                            {showAuthorEdit ? <IconButton style={{
                                padding: 0
                            }} disableFocusRipple disableRipple size='small'
                                                          onClick={() => setEditingAuthor(true)}>
                                <EditIcon fontSize='small'/>
                            </IconButton> : null}
                        </Box>) : (
                        <Box>
                            <Grid container direction={"row"} spacing={1} alignContent="center">
                                <Grid item xs={4}>
                                    <TextField value={bookDetails.author.first_name}
                                               onChange={(e) => handleAuthorChange(e.target.value, 'first_name')}
                                               label="First Name"/>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField value={bookDetails.author.last_name}
                                               onChange={(e) => handleAuthorChange(e.target.value, 'last_name')}
                                               label="Last Name"/>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton onClick={() => setEditingAuthor(false)}><CloseIcon/></IconButton>
                                    <IconButton onClick={handleSaveAuthor}><CheckIcon/></IconButton>
                                </Grid>
                            </Grid>
                        </Box>)
                    }

                </Box> : null}
            </CardContent>
        </Card>
    )

}

export default BookDetail;
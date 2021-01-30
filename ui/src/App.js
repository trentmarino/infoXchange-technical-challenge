import './App.css';
import Container from "@material-ui/core/Container";
import BookList from "./components/BookList";
import {Box, Grid, Typography} from "@material-ui/core";
import Detail from "./components/Detail";
import React from "react";
import {useSelector} from "react-redux";

function App() {

        const bookId = useSelector(state => state.getBookId.bookId)


    return (
        <Container maxWidth="lg">
            <Box p={2}>
                <Grid container spacing={1} direction='row'>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Book Catalog
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{
                        border: '1px solid #ccc',
                        height: '80vh'
                    }}>
                        <Grid container spacing={1} direction='row'>
                            <Grid item xs={6}>
                                <BookList/>
                            </Grid>
                            <Grid item xs={6}>
                                {!bookId ? <Box display="flex" style={{
                                    height: '100%'
                                }} justifyContent='center' alignItems="center">
                                    <Typography>
                                        Please select a book from the left
                                    </Typography>
                                </Box> : <Detail/> }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;

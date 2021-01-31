import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, InputLabel,
    MenuItem, Select,
    TextField
} from "@material-ui/core";
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {setSavedStatus} from "../redux/actions/book.actions";
import {getAuthors} from "../services/author";

function AddNewDialog(props) {

    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const [authors, setAuthors] = useState([])
    useEffect(() => {

        const fetchAuthors = async () => {
            const response = await getAuthors();
            setAuthors(response)
        }

        setData(props.dataStructure);
        if (props.formType === 'book') {
            fetchAuthors();
        }
    }, [props])

    const handleChange = (value, key) => {
        const copyOfData = {...data};
        copyOfData[key] = value;
        setData(copyOfData);
    }

    const validateForm = () => {
        const fields = Object.keys(props.dataStructure);
        const numberOfFields = fields.length;
        let count = 0;
        for (let i = 0; i < fields.length; i++) {
            if (data[fields[i]]) {
                count += 1
            }
        }
        return count === numberOfFields;
    }

    const renderForm = () => {
        switch (props.formType) {
            case "book":
                return (
                    <Box>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <TextField value={data.name}
                                           error={!data.name}
                                           onChange={(e) => handleChange(e.target.value, 'name')}
                                           label="Name"/>
                            </Grid>
                            <Grid>
                                <TextField value={data.isbn}
                                           error={!data.isbn}
                                           onChange={(e) => handleChange(e.target.value, 'isbn')}
                                           label="Isbn"/>
                            </Grid>
                            <Grid>
                                <Box mt={1}>
                                    <InputLabel id="authors">Author</InputLabel>
                                    <Select fullWidth
                                            id='authors'
                                            value={data.author_id}
                                            error={!data.author_id}
                                            onChange={(e) => handleChange(e.target.value, 'author_id')}
                                    >
                                        {authors.map(option => (
                                            <MenuItem key={option.id}
                                                      value={option.id}>{option.last_name} , {option.first_name}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                )
            case "author":
                return (
                    <Box>
                        <Grid container direction='column'>
                            <Grid item>
                                <TextField value={data.first_name}
                                           error={!data.first_name}
                                           onChange={(e) => handleChange(e.target.value, 'first_name')}
                                           label="Fist name"/>

                            </Grid>
                            <Grid>
                                <TextField value={data.last_name}
                                           error={!data.last_name}
                                           onChange={(e) => handleChange(e.target.value, 'last_name')}
                                           label="Last name"/>
                            </Grid>
                        </Grid>
                    </Box>
                )
            default:
                return null
        }
    }

    const handleSave = () => {
        try {
            props.onSave(data);
        } catch (err) {
            console.log(err);
        }
        dispatch(setSavedStatus(true));
        props.onClose(true, `Successfully created ${props.formType.toLowerCase()}`);

    }

    return (
        <Dialog ref={props.dialogRef} open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {renderForm()}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose(false)}>
                    Cancel
                </Button>
                <Button disabled={!validateForm()} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AddNewDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    formType: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func
}

export default AddNewDialog
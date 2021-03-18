import React, { useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import * as CONSTANTS from '../constants';
import axios from 'axios';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(1),
        width: 300,
    },
    error: {
        marginTop: theme.spacing(8),
        alignItems: 'center',
        color: theme.palette.error.main,
    }
}));

export default function SignUp() {
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const emailRef = useRef('');
    const fromDateRef = useRef('');
    const toDateRef = useRef('');
    const classes = useStyles();
    const history = useHistory();
    const [appState, setAppState] = useState({
        loading: false,
        error: null,
    });

    function onSubmit(e) {
        e.preventDefault();
        if (isValid()) {
            setAppState({ loading: true, error: null })
            axios.post(CONSTANTS.SIGNUP_API, {
                "username": usernameRef.current.value,
                "password": passwordRef.current.value,
                "roles": ["seller"], //going to be always seller from webapp
                "email": emailRef.current.value,
                "availableFrom": fromDateRef.current.value,
                "availableTo": toDateRef.current.value,
            }).then((data) => {
                console.log(data);
                setAppState({ loading: false, error: null });
                let path = `signin`; 
                history.push(path);
            }).catch((error) => {
                setAppState({ loading: false, error: error.message })
            });
        }
    }

    function isValid() {
        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let availableFrom = fromDateRef.current.value;
        let availableTo = toDateRef.current.value;
        var error = '';
        if (isEmptyValues(username)) {
            error = 'Username is invalid\n';
        }
        if (isEmptyValues(email)) {
            error += 'Email is invalid\n';
        }
        if (isEmptyValues(availableFrom)) {
            error += 'Available From is invalid\n';
        }
        if (isEmptyValues(availableTo)) {
            error += 'Available To is invalid\n';
        }
        setAppState({ error: error });
        if (error) {
            return false;
        }
        return true;

    }

    function isEmptyValues(value) {
        return _.isNull(value) || _.isNull(value) || _.isNaN(value)
            || (typeof value === 'object' && Object.keys(value).length === 0)
            || (typeof value === 'string' && _.trim(value).length === 0);
    }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Seller Sign up
        </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={usernameRef}
                                    autoComplete="uname"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={emailRef}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={passwordRef}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    inputRef={fromDateRef}
                                    id="datetime-local"
                                    label="Available From"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    inputRef={toDateRef}
                                    id="datetime-local"
                                    label="Available To"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            Sign Up
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <div className={classes.error}>
                        {appState.error}
                    </div>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
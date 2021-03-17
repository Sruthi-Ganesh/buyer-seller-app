import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from 'axios'
import * as CONSTANTS from '../constants';
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
import { useDispatch } from 'react-redux'
import {saveToken} from '../actions/token_saver';
function LoginForm() {
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const history = useHistory();
    const dispatch = useDispatch();
    const [appState, setAppState] = useState({
        loading: false,
        error: null,
      });

    function onSubmit(e) {
        e.preventDefault()
        console.log("onsubmit");
        axios.post(CONSTANTS.LOGIN_API, {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value,
            "requestedRole": "seller" //going to be always seller from webapp
        }).then((res) => {
            let data = res.data;
            let roles = data.roles;
            let access_token = data.accessToken;
            dispatch(saveToken(access_token));
            console.log(data);
            setAppState({ loading: false, error: null, roles: roles, access_token: access_token });
            let path = `seller`; 
            history.push(path);
        }).catch((error) => {
            setAppState({ loading: false, error: error.message })
        });
    }

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Sruthi's Website
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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        error: {
            marginTop: theme.spacing(8),
            alignItems: 'center',
            color: theme.palette.error.main,
        }
    }));

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Seller Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        inputRef={usernameRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.error}>
                    {appState.error}
                </div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
export default LoginForm;
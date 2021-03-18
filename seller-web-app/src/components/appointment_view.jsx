import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
import * as CONSTANTS from '../constants';
import { useSelector } from 'react-redux';
import AlignItemsList from './appointment_list';

export default function Appointment(props) {

    let token = useSelector(state => state.tokens);
    let access_token = token ? token.access_token : null;
    const history = useHistory();
    const [appState, setAppState] = useState({
        loading: true,
        error: null,
        appointments: [],
    });

    function getAppointments() {
        axios.get(props.url, {
            headers: {
                'x-access-token': access_token
            }
        }).then((resp) => {
            let appointments = resp.data.data
            for (var i = 0; i < appointments.length; i++) {
                let appointment = appointments[i];
                appointments[i] = {
                    ...appointment,
                    status_name: CONSTANTS.APPOINTMENT_STATUS_VALUES[appointment.status],
                    scheduled_at_local: new Date(appointment.scheduledAt).toString().split('GMT')[0]
                }
            }
            setAppState({ loading: false, error: null, appointments: appointments });
        }).catch((error) => {
            setAppState({ loading: false, error: error.message })
        });
    }

    useEffect(() => {
        getAppointments()
    }, [access_token, token]);

    if (!access_token) {
        let path = `signin`;
        history.push(path);
    }

    return (<AlignItemsList appointments={appState.appointments} access_token={access_token} onSubmit={getAppointments}></AlignItemsList>)
}
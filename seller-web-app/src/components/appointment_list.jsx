import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as CONSTANTS from '../constants';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginLeft: theme.spacing(8),
        maxWidth: 160,
    },
});

function AlignItemsList(props) {
    let access_token = props.access_token
    let appointments = props.appointments;

    function onAccept(e, appointment) {
        e.preventDefault();
        axios.post(CONSTANTS.APPOINTMENT_API + '/' + appointment.id + '/approve', {}, {
            headers: {
                'x-access-token': access_token
            }
        }).then((resp) => {
            alert(resp.data.message);
            props.onSubmit()
        });
    }

    function onCancel(e, appointment) {
        e.preventDefault();
        axios.post(CONSTANTS.APPOINTMENT_API + '/' + appointment.id + '/cancel', {}, {
            headers: {
                'x-access-token': access_token
            }
        }).then((resp) => {
            alert(resp.data.message);
            props.onSubmit()
        });
    }

    const { classes } = props;
    if (appointments.length === 0) {
        return <div> No requests right now</div>
    }
    return (
        <List className={classes.root}>
            {appointments.map(appointment => {
                return (
                    <ListItem id={appointment.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={appointment.buyer} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={appointment.buyer}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                        {appointment.buyer_email}
                                    </Typography>
                                    <br></br>
                                    {"Request Scheduled at "}{appointment.scheduled_at_local}
                                    <br></br>
                                    {"Acceptance Status: "}{appointment.status_name}
                                </React.Fragment>
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => onAccept(e, appointment)}
                        >
                            Accept
    </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => onCancel(e, appointment)}
                        >
                            Cancel
    </Button>
                    </ListItem>
                )
            })}

        </List>
    );
}

AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);
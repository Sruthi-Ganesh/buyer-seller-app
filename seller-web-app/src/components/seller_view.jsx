import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Availability from './availablity_view';
import Appointment from './appointment_view';
import * as CONSTANTS from '../constants'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });
  
  export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Pending Appointment Requests" {...a11yProps(0)}/>
          <Tab label="All Requests" {...a11yProps(1)}/>
          <Tab label="Change Appointment Schedule" {...a11yProps(2)}/>
        </Tabs>
        <TabPanel value={value} index={0}>
        <Appointment url={CONSTANTS.PENDING_APPOINTMENT_API}> </Appointment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Appointment url={CONSTANTS.APPOINTMENT_API}> </Appointment>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Availability/>
      </TabPanel>
      </Paper>
    );
  }
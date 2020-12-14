import React from 'react';
import AddUsers from './addUsers';
import SentMessages from './sentMessages';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'
import './Homestyles.css'






const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        backgroundColor: "#3B8BEB",
        color: "#C4DBF6",
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const HomePage = () => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [contacts, setContacts] = React.useState(false)
    const [messages, setMessages] = React.useState(false)

    return (
        <div>


            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        OTP App
          </Typography>
                </Toolbar>
            </AppBar>


            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <h4>Kisan Network</h4>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <br></br>


                <List>
                    <ListItem button key="Add" onClick={() => { setContacts(true); setMessages(false); }}>

                        <ListItemIcon>
                            <Tooltip title="Contacts">
                                <img src="https://img.icons8.com/plasticine/100/000000/contacts.png" width="50px" height="50px"/>
                                
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Contacts" />


                    </ListItem>

                    <ListItem button key="Add" onClick={() => { setContacts(false); setMessages(true); }}>

                        <ListItemIcon>
                            <Tooltip title="Messages">
                                <img src="https://img.icons8.com/fluent/48/000000/new-message.png" width="45px" height="45px"/>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Messages" />


                    </ListItem>
                </List>
            </Drawer>



            {contacts ?
                <div id="content">
                    <AddUsers />
                </div>
                : messages ?
                    <div id="content">
                        <SentMessages />
                    </div>
                    :
                    <div>
                        <div id="heading">
                            Welcome to Otp app
                </div>

                        <div id="intro">
                            Keep records of users and send them OTPs.
                     <br></br><br></br><br></br>
                     Please use the drawer in the left to navigate.
                </div>
                    </div>

            }

            {/* 
                <SentMessages /> */}
        </div>

    )

}

export default HomePage
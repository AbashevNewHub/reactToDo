import React, {useState} from 'react';
import {Link} from 'react-router-dom';
//MUI COMPONENTS
import {
    AppBar, Toolbar, IconButton, Box, Button, Drawer,
    List, ListItem, ListItemText, ListItemIcon, makeStyles, Typography
} from "@material-ui/core";
//MUI ICONS
import {Menu as MenuIcon, List as ListIcon, Label as LabelIcon} from '@material-ui/icons'
//CSS
const useStyles = makeStyles(theme => ({
    thead: {
        backgroundColor: theme.palette.secondary.main
    },
    menuIcon: {
        marginRight: theme.spacing(2),
    },
    list: {
        width: '300px'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
}));

const Navigation = () => {
    const classes = useStyles();
    //state
    const [drawOpen, setDrawOpen] = useState(false);
    //functions
    const toggleDrawer = () => {
        setDrawOpen(!drawOpen);
    };
    const drawerItems = [
        {text: 'To-Do List', icon: <ListIcon/>, link: '/todo-list',},
        {text: 'Tags', icon: <LabelIcon/>, link: '/tag-list',},
    ];
    return (
        <AppBar position="fixed" className={classes.thead}>
            <Toolbar>
                <IconButton className={classes.menuIcon} edge="start" onClick={toggleDrawer}><MenuIcon/></IconButton>
                <Link className={classes.link} to="/todo-list">
                    <Typography color="textPrimary" variant="h6">TodoApp</Typography>
                </Link>
                <Box flexGrow={1}/>
                <Button size="small">Login</Button>
            </Toolbar>
            <Drawer variant="temporary" anchor="left" onClose={toggleDrawer} open={drawOpen}>
                <List className={classes.list}>
                    {drawerItems.map(menuItem => (
                        <Link className={classes.link} to={menuItem.link} key={menuItem.text}>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText>{menuItem.text}</ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;
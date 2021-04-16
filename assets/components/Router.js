//REACT
import React from 'react';
//ROUTER
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//MUI COMPONENTS
import {makeStyles} from '@material-ui/core/styles';
//CUSTOM COMPONENTS
import NotFound from './NotFound';
import TodoContextProvider from '../contexts/TodoContext';
import AppSnackbar from './AppSnackbar';
import Navigation from './Navigation';
import TodoTable from './TodoTable';

//CSS
const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}));

//Functions
const TodoList = () => (
    <TodoContextProvider>
        <AppSnackbar/>
        <TodoTable/>
    </TodoContextProvider>
);


const Router = () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <Navigation/>
            <div className={classes.divider}/>
            <Switch>
                <Redirect exact from="/" to="/todo-list"/>
                <Route exact path="/todo-list" component={TodoList}/>
                <Route exact path="/tag-list" component={null}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
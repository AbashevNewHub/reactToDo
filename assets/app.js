// any CSS you import will output into a single css file (app.css in this case)
//import './styles/app.css';
// start the Stimulus application
//import './bootstrap';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./contexts/TodoContext";
import TodoTable from "./components/TodoTable";
import AppSnackbar from "./components/AppSnackbar";
import {CssBaseline} from "@material-ui/core";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                    <AppSnackbar/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));




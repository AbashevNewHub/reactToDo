import React, {useContext} from 'react';
import {Button, IconButton, Snackbar, SnackbarContent} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";
import CloseIcon from '@material-ui/icons/Close';

function AppSnackbar() {
    const context = useContext(TodoContext);

    function checkLevel(level) {
        switch (level) {
            case 'success' :
                return 'green';
            case 'error':
                return 'red';
            case 'warning':
                return 'orange';
            case 'notice':
                return 'beige'
            default:
                return 'white';
        }
    }

    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}
                  onClose={() => context.setMessage({})}>
            {context.message.text && (
                <SnackbarContent style={{backgroundColor: checkLevel(context.message.level)}}
                                 severity={context.message.level}
                                 message={context.message.text}
                                 action={[
                                     <IconButton
                                         onClick={() => context.setMessage({})}
                                         key='dismiss' color='inherit'>
                                         <CloseIcon/>
                                     </IconButton>
                                 ]}/>
            )}
        </Snackbar>
    );
}

export default AppSnackbar;
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {
    const context = useContext(TodoContext);
    const hide = () => {
        props.setDeleteConfirmationIsShown(false)
    }
    return (
        <Dialog open={props.open} onClose={hide} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Are you sure you wish delete this to-do?</DialogTitle>
            <DialogContent>
                Todo task - {props.todo.task}.
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Cancel</Button>
                <Button onClick={()=>{
                    context.deleteTodo({id: props.todo.id, task: props.todo.task });
                    hide();
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number,
        task: PropTypes.string,
    })
}
export default DeleteDialog;
import React, {Component, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
    Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, InputAdornment, Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoTask, setAddTodoTask] = useState('');
    const [editTodoTask, setEditTodoTask] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const clear = () => {
        setEditIsShown(false);
    }
    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {task: addTodoTask, description: addTodoDescription});
        setAddTodoTask('');
        setAddTodoDescription('');
    }
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, task: editTodoTask, description: editTodoDescription});
        clear();
    }
    return (
        <React.Fragment>
            <Table>
                {/* HEAD */}
                <TableHead>
                    <TableRow>
                        <TableCell width="30%">Task</TableCell>
                        <TableCell width="60%">Description</TableCell>
                        <TableCell width="10%" align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {/* BODY */}
                <TableBody>
                    {/* ADD */}
                    <TableRow key="addNew">
                        <TableCell>
                            {/* add Task field */}
                            <TextField type="text"
                                       label="Task"
                                       variant="outlined"
                                       fullWidth={true}
                                       required={true}
                                       value={addTodoTask}
                                       onChange={(event) => {
                                           setAddTodoTask(event.target.value);
                                       }}
                            />
                        </TableCell>
                        <TableCell>
                            {/* add Description field */}
                            <TextField type="text"
                                       label="Description"
                                       variant="outlined"
                                       fullWidth={true}
                                       required={true}
                                       multiline={true}
                                       value={addTodoDescription}
                                       onChange={(event) => {
                                           setAddTodoDescription(event.target.value);
                                       }}
                            />
                        </TableCell>
                        <TableCell align="right">
                            <IconButton onClick={onCreateSubmit}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>

                    {/* DATA */}
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            {/* TASK */}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <TextField type="text"
                                               variant="outlined"
                                               autoFocus={true}
                                               fullWidth={true}
                                               required={true}
                                               value={editTodoTask}
                                               onChange={(event) => {
                                                   setEditTodoTask(event.target.value);
                                               }}
                                    />
                                    :
                                    <Typography>{todo.task}</Typography>
                                }
                            </TableCell>

                            {/* DESCRIPTION */}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <TextField type="text"
                                               variant="outlined"
                                               fullWidth={true}
                                               multiline={true}
                                               required={true}
                                               value={editTodoDescription}
                                               onChange={(event) => {
                                                   setEditTodoDescription(event.target.value);
                                               }}
                                    />
                                    :
                                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell align="right">
                                {editIsShown === todo.id ?
                                    <React.Fragment>
                                        <IconButton onClick={onEditSubmit.bind(this, todo.id)}><DoneIcon/></IconButton>
                                        <IconButton onClick={clear}><CloseIcon/></IconButton>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <IconButton onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodoTask(todo.task);
                                            setEditTodoDescription(todo.description);
                                        }}><EditIcon/></IconButton>
                                        <IconButton onClick={() => {
                                            setDeleteConfirmationIsShown(true);
                                            setTodoToBeDeleted(todo);
                                        }}><DeleteIcon/></IconButton>
                                    </React.Fragment>
                                }

                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {deleteConfirmationIsShown && (
                <DeleteDialog
                    todo={todoToBeDeleted}
                    open={deleteConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}
        </React.Fragment>
    );
}

export default TodoTable;
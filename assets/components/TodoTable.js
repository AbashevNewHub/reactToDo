import React, {Component, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TextField,
    InputAdornment
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editTodo, setEditTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);

    return (
        <form onSubmit={(event) => {
            context.createTodo(event, {name: addTodo});
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width="80%">Task</TableCell>
                        <TableCell width="20%" align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key="addNew">
                        <TableCell>
                            <TextField label="New Task" variant="outlined"
                                       value={addTodo}
                                       onChange={(event) => {
                                           setAddTodo(event.target.value);
                                       }} fullWidth={true} required={true}/>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit">
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                {
                                    editIsShown === todo.id ?
                                        <TextField variant="outlined"
                                                   value={editTodo}
                                                   onChange={(event) => {
                                                       setEditTodo(event.target.value);
                                                   }}
                                                   InputProps={{
                                                       endAdornment:
                                                           <InputAdornment position="end">
                                                               <IconButton onClick={() => {
                                                                   setEditIsShown(false);
                                                               }}><CloseIcon/></IconButton>

                                                               <IconButton onClick={(event) => {
                                                                   context.updateTodo({id: todo.id, name: editTodo});
                                                                   setEditIsShown(false);
                                                               }}><DoneIcon/></IconButton>
                                                           </InputAdornment>
                                                       ,
                                                   }}
                                                   fullWidth={true} required={true}/>
                                        :
                                        todo.name
                                }
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => {
                                    setEditIsShown(todo.id);
                                    setEditTodo(todo.name);
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton><DeleteIcon/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );
}

export default TodoTable;
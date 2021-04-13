import React, {Component, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class TodoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const context = this.context;
        return (
            <form onSubmit={(event) => {
                context.createTodo(event, {name: this.state.value})
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key="addNew">
                            <TableCell>
                                <TextField fullWidth={true}
                                           label="New Task"
                                           value={this.state.value} onChange={this.handleChange}/>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>{todo.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton><EditIcon/></IconButton>
                                    <IconButton><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
        );
    }
}

TodoTable.contextType = TodoContext;
export default TodoTable;
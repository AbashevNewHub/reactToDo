import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            todos: [],
            message: {},
        };
        this.readTodo();
    }

    //create
    createTodo(event, todo) {
        if (todo.name !== "" && todo.description !== "") {
            event.preventDefault();
            axios.post('/api/todo/create', todo)
                .then(response => {
                    if (response.data.message.level === 'error') {
                        this.setState({message: response.data.message});
                    } else {
                        let data = [...this.state.todos];
                        data.push(response.data.todo);
                        this.setState({
                            todos: data,
                            message: response.data.message,
                        });
                    }
                }).catch(error => {
                console.error(error);
            });
        } else {
            this.setState({
                message: {lavel: 'error', text: 'Problem with data'},
            });
        }
    }

    //read
    readTodo() {
        axios.get('/api/todo/read')
            .then(response => {
                this.setState({
                    todos: response.data,
                });
            }).catch(error => {
            console.error(error);
        });
    }

    //update
    updateTodo(todo) {
        if (todo.name !== "" && todo.description !== "") {
            axios.put('/api/todo/update/' + todo.id, todo)
                .then(response => {
                    if (response.data.message.level === 'error') {
                        this.setState({message: response.data.message});
                    } else {
                        let data = [...this.state.todos];
                        let item = data.find(elem => {
                            return elem.id === todo.id
                        });
                        item.name = response.data.todo.name;
                        item.description = response.data.todo.description;
                        this.setState({
                            todos: data,
                            message: response.data.message,
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            this.setState({
                message: {lavel: 'error', text: 'Problem with data'},
            });
        }
    }

    //delete
    deleteTodo(todo) {
        axios.delete('/api/todo/delete/' + todo.id, todo)
            .then(response => {
                if (response.data.message.level === 'error') {
                    this.setState({message: response.data.message});
                } else {
                    let data = [...this.state.todos];
                    let item = data.find(elem => {
                        return elem.id === todo.id
                    });
                    data.splice(data.indexOf(item), 1);
                    this.setState({
                        todos: data,
                        message: response.data.message,
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => this.setState({message: message})
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;
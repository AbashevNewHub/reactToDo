import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            todos: [],
        };
        this.readTodo();
    }

    //create
    createTodo(event, todo) {
        if (todo.name !== "") {
            event.preventDefault();
            let data = [...this.state.todos];
            data.push(todo);
            this.setState({
                todos: data
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
        //console.log(data);
        if (todo.name !== "") {
            let data = [...this.state.todos];
            let item = data.find(elem => {
                return elem.id === todo.id
            });
            item.name = todo.name;
            this.setState({
                todos: data
            });
        }
    }

    //delete
    deleteTodo(todo) {
        let data = [...this.state.todos];
        let item = data.find(elem => {
            return elem.id === todo.id
        });
        data.splice(data.indexOf(item), 1);
        this.setState({
            todos: data
        });

    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;
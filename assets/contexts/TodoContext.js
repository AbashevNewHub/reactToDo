import React, {Component, createContext} from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            todos: [
                {id: 1, name: 'do something 1'},
                {id: 2, name: 'do something 2'},
                {id: 3, name: 'do something 3'},
                {id: 4, name: 'do something 4'},
                {id: 5, name: 'do something 5'},
            ],
        };
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
    deleteTodo() {

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
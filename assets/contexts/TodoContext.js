import React, {Component, createContext} from 'react';
export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            todos: [
                {name: 'do something'},
                {name: 'do something 2'},
                {name: 'do something 3'},
                {name: 'do something 4'},
            ],
        };
    }

    //create
    createTodo(event, todo){
        event.preventDefault();
        //console.log(todo);
        let data = [...this.state.todos];
        data.push(todo);
        this.setState({
            todos: data
        });
    }

    //read
    readTodo(){

    }

    //update
    updateTodo(){

    }

    //delete
    deleteTodo(){

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
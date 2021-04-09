// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
// start the Stimulus application
import './bootstrap';

console.log('Hi! I am a React app');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



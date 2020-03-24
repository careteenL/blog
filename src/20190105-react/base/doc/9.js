import React from './react';
import ReactDOM from './react-dom';
//let element = <h1 id="title"><span>hello</span><span>world</span></h1>;
//background-color => backgroundColor
/* let element = React.createElement('h1', { id: 'title' },
    React.createElement('span', { style: { color: 'red', backgroundColor: 'yellow' } }, 'hello'),
    React.createElement('span', { className: 'world' }, 'world')); */
/* function Welcome(props) {
    return (
        <h1 id={props.id}>
            <span>hello</span>
            <span>world</span>
        </h1>
    )
} */
class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h1 id={this.props.id}>
                <span>hello</span>
                <span>world</span>
            </h1>
            // React.createElement('h1', { id: 'title' });
        )
    }
}
let element = React.createElement(Welcome, { id: 'title' });
console.log(element);
ReactDOM.render(element, document.getElementById('root'));
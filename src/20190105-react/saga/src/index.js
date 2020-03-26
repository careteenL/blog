import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import Second from './components/Second';
ReactDOM.render(
    <Provider store={store}>
        <Second />
    </Provider>, document.getElementById('root'));
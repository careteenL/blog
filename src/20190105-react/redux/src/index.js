import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import { Provider } from './react-redux';
import store from './store';
ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>, document.getElementById('root'));
/**
 * Provider是用来接收一个store的属性，然后以上下文的形式传递给下组件
 * 下层组件要想获取store.不需要再自忆引入了，直接 从上下中取就可以
 */
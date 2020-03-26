import React from 'react';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import { createLogger } from 'redux-logger';

import keymaster from 'keymaster';
//applyMiddleware(createLogger);
const app = dva({
    onAction: createLogger(),
});
//combineReducer
/**
 * state= {
 *   counter1: { number: 1 }
 *   counter2:{ number: 2 }
 * }
 */
const delay = ms => new Promise(function (resolve) {
    setTimeout(() => {
        resolve();
    }, ms);
});
//定义模型 
app.model({
    namespace: 'counter1',
    state: { number: 0 },
    reducers: {
        //属性名就是action-type,值就是一个函数，用来计算新状态的
        //store.dispatch({type:'counter1/add'});
        add(state) {
            //这个并不是store里的 reducer
            return { number: state.number + 1 };
        },
        minus(state) {
            return { number: state.number - 1 };
        },
        log(state) {
            console.log('reducers log');
            return { number: 100 };;
        }
    },
    //如果想实现异步操作的话,需要用effects
    effects: {
        *asyncAdd(action, { put, call }) {
            yield call(delay, 1000);
            yield put({ type: 'add' });
        },
        *log(action, { select }) {
            let state = yield select(state => state.counter1);
            console.log('effects log', state);
        }
    },
    subscriptions: {
        changeTitle({ history }) {
            history.listen((location) => {
                console.log(location);
                document.title = location.pathname;
            });
        },
        keyboard({ dispatch }) {
            keymaster('space', () => {
                dispatch({ type: 'add' });
            });
        }
    }
});
app.model({
    namespace: 'counter2',
    state: { number: 0 },
    reducers: {
        //store.dispatch({type:'counter2/add'});
        add(state) {
            return { number: state.number + 1 };
        },
        minus(state) {
            return { number: state.number - 1 };
        }
    }
});
function Counter1(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => props.dispatch({ type: 'counter1/add' })}>+</button>
            <button onClick={() => props.dispatch({ type: 'counter1/asyncAdd' })}>asyncAdd</button>
            <button onClick={() => props.dispatch({ type: 'counter1/log' })}>log</button>
            <button onClick={() => props.dispatch({ type: 'counter1/minus' })}>-</button>
        </div>
    )
}
let ConnectedCounter1 = connect(state => state.counter1)(Counter1);
function Counter2(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => props.dispatch({ type: 'counter2/add' })}>+</button>
            <button onClick={() => props.dispatch({ type: 'counter2/minus' })}>-</button>
        </div>
    )
}
let ConnectedCounter2 = connect(state => state.counter2)(Counter2);
app.router(({ history }) => (
    <Router history={history}>
        <>
            <Route path="/" component={ConnectedCounter1} />
            <Route path="/" component={ConnectedCounter2} />
        </>
    </Router>
));
app.start('#root');

/**
 * dva是一个非常非常轻量级的封装
 * react react-dom react-router-dom connected-react-router redux redux-saga
 */
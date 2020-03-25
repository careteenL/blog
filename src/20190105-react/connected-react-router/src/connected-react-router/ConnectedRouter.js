import React, { useEffect, useContext } from 'react';
import { Router } from 'react-router';
import { LOCATION_CHANGE } from './types';
import { ReactReduxContext } from 'react-redux';
export default function (props) {
    let { store } = useContext(ReactReduxContext);//contextValue={store}
    useEffect(() => {
        //当浏览器的路径发生改变之后，会调用监听函数，并传入location, action
        //location代表当前的路径对象，action代表动作 POP PUSH REPLACE
        //props.history.listen它是怎么监听的
        //hash history hashchange    browser history  popstate
        return props.history.listen((location, action) => {
            store.dispatch({
                type: LOCATION_CHANGE,
                payload: {
                    location,
                    action
                }
            });
        });
    }, []);
    return (
        <Router history={props.history}>
            {props.children}
        </Router>
    )
}
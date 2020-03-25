import React from 'react';
import ReactReduxContext from './Context';
export default function (props) {//{store:仓库}
    return (
        <ReactReduxContext.Provider value={{ store: props.store }}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}
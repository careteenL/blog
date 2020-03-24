import React, { useContext } from 'react';
import RouterContext from './RouterContext';
export default function (props) {
    let routerContext = useContext(RouterContext);
    let { when, message } = props;
    if (when) {
        routerContext.history.block(message);//message prompt
    } else {
        routerContext.history.block(null);
    }
    return null;
}
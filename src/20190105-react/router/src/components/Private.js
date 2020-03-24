import React from 'react';
import { Route, Redirect } from '../react-router-dom';
export default function (props) {
    let { path, component: RouteComponent } = props;
    return (
        <Route path={path} render={routeProps => {
            return localStorage.getItem('login') ? <RouteComponent {...routeProps} /> :
                <Redirect to={{ pathname: '/login', state: { from: routeProps.location.pathname } }} />
        }} />
    )
}
/**
 * Route组件里渲染组件有三种方式
 * 1. component 最简单，最直接 ，但是不能加入任何的逻辑判断
 * 2. render 是一个函数，当路径匹配的时候，会渲染render方法的返回值
 */
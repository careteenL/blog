import React from 'react';
import { NavLink, Route, Switch, Redirect } from '../react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';
export default function (props) {
    return (
        <div className="row">
            <div className="col-md-2">
                <ul className="nav nav-stack">
                    <li><NavLink to="/user/list">用户列表</NavLink></li>
                    <li><NavLink to="/user/add">新增用户</NavLink></li>
                </ul>
            </div>
            <div className="col-md-10">
                <Switch>
                    <Route path="/user/list" component={UserList} />
                    <Route path="/user/add" component={UserAdd} />
                    <Route path="/user/detail/:id" component={UserDetail} />
                    <Redirect to="/user/list" />
                </Switch>
            </div>
        </div>
    )
}
/**
 * 学习知识点
 * 1. 二级路由
 * 2. 跳转路由如何传参
 * 3. 动态路由如何实现
 */
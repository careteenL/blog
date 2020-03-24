import React from 'react';
import './NavLink.css';
import { Route, Redirect, Link } from '../react-router-dom';
export default function (props) {
    let { to, exact, children } = props;
    //let activeStyle = { backgroundColor: 'green', color: 'red' };
    return (
        <Route
            path={to}
            exact={exact}
            children={
                routerProps => (
                    <Link
                        className={routerProps.match ? 'active' : ''}
                        to={to}>{children}</Link>
                )
            }
        />
    )
}
/**
 * pathname=/
 * exact=true exact=false  /user /profile /home
 * exact能决定是否能匹配上 ,就否匹配上会决定是否有match属性
 *
 * Route的exact和match.isExact没有关系
 * 如果能匹配那么就有match
 * match.isExact是否为true是由匹配的路径和完整路径 是否相等来决定的
 *
 * exact决定是否要不要精准匹配，isExact是否有没有精准匹配到
 * 如果exact=true  isExact肯定为true
 * 如果exact=false isExact有可能为true,也有可能为false
 * exact =true   /user  /user isExact=true
 * exact=false pathname=/user/add path=/user isExact=false
 * exact=false pathname=/user path=/user isExact=true
 *
 * Route的exact和  routeProps.match.isExact
 * children不管是否匹配都渲染children的返回值
 * match会由path和exact共同决定
 * path=/user
 * pathname=/user/list
 */
/**
 * 使用Route来源的好处是我可以在children函数里通过props.match是否有值来判断是否匹配
 * MenuLink 原理是这样的
 * 跟Link很像，或者说是基于Link
 * 多了一个功能，如果to里的路径和当前的地址栏的路径匹配的话，则增加一个active类名
 *
 * render component都有共同的特点，就是说只有Route的path跟路径匹配的话才会渲染
 * children也是一个函数，但是它不管路径 是否匹配都会进行渲染
 */
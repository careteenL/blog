import React from 'react';
import RouterContext from "./RouterContext.js";
import pathToRegexp from 'path-to-regexp';
/**
 * Route代表一条路由规则
 * path代表此规则的路径 
 * component代表要渲染的组件
 * 如果说当前路径 #/user   hashRouter state location pathname =>context传下来了
 */
export default class Route extends React.Component {
    static contextType = RouterContext;//this.context.location.pathname
    render() {
        let { path = '/', component: RouteComponent, exact = false, render, children } = this.props;
        path = typeof path === 'string' ? path : path.pathname;
        let pathname = this.context.location.pathname;
        let paramNames = [];// []
        let regexp = pathToRegexp(path, paramNames, { end: exact });
        paramNames = paramNames.map(item => item.name);//["id","age"]
        let matched = pathname.match(regexp);//['/user/detail/myid/10','myid',10]
        let routeProps = {
            location: this.context.location,
            history: this.context.history,
        }
        if (matched) {
            let [url, ...values] = matched;//url='/user/detail/myid/10' values=['myid',10]
            let params = values.reduce((memo, value, index) => {
                memo[paramNames[index]] = value;
                return memo;
            }, {});//{id:'myid',age:10}
            let match = {
                url,
                path,
                isExact: pathname === url,
                params
            }
            //如果路径匹配，则routeProps里会有match属性，否则就没有
            routeProps.match = match;
            if (RouteComponent) {
                return <RouteComponent {...routeProps} />
            } else if (render) {
                return render(routeProps);
            } else if (children) {
                return children(routeProps);
            } else {
                return null;
            }
        } else {
            if (children) {
                return children(routeProps);
            } else {
                return null;
            }
        }
    }
}
/**
 * 如果一个组件是通过路由渲染出来的话，那么它有三个属性
 * location
 * history
 * match
 *    url 这个path属性匹配到的路径的部分 /user/detail/myid/10
 *    path Route里的path属性   /user/detail/:id/:age    pathname=/user/detail/myid/10/xx
 *    isExact 是精确匹配，或者 说就是 pathname===url是否完全 相等   false
 *    params: {id:myid,age:10}
 */
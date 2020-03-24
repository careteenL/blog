import React, { useState } from 'react';
import RouterContext from "./RouterContext.js";
/**
 * HashRouter只是一个容器，并没有DOM结构，它渲染的就是它的子组件
 * 它就是为了向下层组件传递 location
 */
export default class HashRouter extends React.Component {
    state = {
        location: {
            pathname: window.location.hash.slice(1),// #/user /user
        }
    }
    componentDidMount() {
        window.addEventListener('hashchange', event => {
            this.setState({
                ...this.state,
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/',
                    state: this.locationState
                }
            });
        });
        window.location.hash = window.location.hash || '/';
    }
    render() {
        let that = this;
        let history = {
            location: this.state.location,
            push(to) {
                if (history.prompt) {
                    let target = typeof to === 'string' ? { pathname: to } : to;
                    let yes = window.confirm(history.prompt(target));
                    if (!yes) return;
                }
                if (typeof to === 'object') {//传的是一个对象 {pathname,state}
                    let { pathname, state } = to;
                    that.locationState = state;
                    window.location.hash = pathname;
                } else {//就是个字符串
                    window.location.hash = to;
                }
            },
            block(prompt) {
                history.prompt = prompt;
            },
            unblock() {
                history.prompt = null;
            }

        }
        let routerValue = {
            location: that.state.location,
            history
        }
        return (
            <RouterContext.Provider value={routerValue}>
                {that.props.children}
            </RouterContext.Provider>
        )
    }
}
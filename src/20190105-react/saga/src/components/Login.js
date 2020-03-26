import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/login';
import { getItem } from '../Api';
function Login(props) {
    /*   useEffect(() => {
          let token = getItem('token');
          props.setToken(token);
      }, []); */
    let usernameRef = useRef();//hooks use开头的 ，它的返回值可以在多次渲染的时候保持是同一份数据
    let passwordRef = useRef();
    const login = (event) => {
        event.preventDefault();
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        props.login(username, password);
    }
    const logout = (event) => {
        event.preventDefault();
        props.logout();
    }
    let username = props.username;
    let loginForm = (
        <form>
            用户名:<input ref={usernameRef} />
            密码:<input ref={passwordRef} />
            <button onClick={login}>登录</button>
            <button onClick={logout}>退出</button>
        </form>
    );
    let logoutForm = (
        <form>
            用户名:{username}
            <button onClick={logout}>退出</button>
        </form>
    )
    return (
        username ? logoutForm : loginForm
    )
}

export default connect(
    state => state.login,
    actions
)(Login);
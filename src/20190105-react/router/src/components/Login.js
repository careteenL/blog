import React, { useRef } from 'react';

export default function (props) {
    let usernameRef = useRef();//每次得到的usernameRef都是同一个 React.creatRef()
    function handleSubmit(event) {
        event.preventDefault();//阻止页面刷新
        localStorage.setItem('login', usernameRef.current.value);
        if (props.location.state) {
            return props.history.push(props.location.state.from);
        }
        return props.history.push('/');
    }
    return (
        <form onSubmit={handleSubmit}>
            用户名<input type="text" className="form-control" ref={usernameRef} />
            <button type="submit" className="btn btn-primary">登录</button>
        </form>
    )
}
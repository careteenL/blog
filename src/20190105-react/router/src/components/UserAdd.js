import React, { useRef, useState, useEffect } from 'react';
import { Prompt } from '../react-router-dom';
/**
 * useEffect() = componentDidMount+componentDidUpdate
 * 只要一个组件是通过路由Route渲染出来的，那么就可以获得一些属性
 * location
 * history
 * match
 * @param {} props 
 */
export default function (props) {
    //isBlocking是否阻止跳跳转  setIsBlocking 设置是否阻止跳转
    let [isBlocking, setIsBlocking] = useState(false);
    let [submiting, setSubmiting] = useState(false);
    let usernameRef = useRef();//每次得到的usernameRef都是同一个 React.creatRef()
    function handleSubmit(event) {
        event.preventDefault();
        setIsBlocking(false);
        setSubmiting(true);
    }
    //useEffect=componentDidMount +componentDidUpdate
    //会在组件渲染后和组件更新后执行
    useEffect(function () {
        if (submiting) {
            let username = usernameRef.current.value;
            let usersStr = localStorage.getItem('users');
            let users = usersStr ? JSON.parse(usersStr) : [];
            users.push({ id: Date.now() + "", username });
            localStorage.setItem('users', JSON.stringify(users));
            props.history.push('/user/list');
        }
    }, [submiting]);//如果依赖的变量是空数组的话，那么就只会在componentDidMount执行一次，以后永远不会再执行了
    //如果不传第二个参数，意味着组件挂载后，和以后所有的组件更新完成都要执行
    return (
        //when是否要阻止跳转 如果用户有输入就要阻止。如果用户没有输止不需要阻止
        //原来就是如果when=true,就会缓存这个message函数，当跳转路径的时候就会使用这message函数返回值来进行提示
        <>
            <Prompt
                when={isBlocking}
                message={location => `请问你是否确定到跳转到${location.pathname}吗?`}
            />
            <form onSubmit={handleSubmit}>
                用户名<input type="text" className="form-control" ref={usernameRef} onChange={
                    event => setIsBlocking(event.target.value.length > 0)
                } />
                <button type="submit" className="btn btn-primary">提交</button>
            </form>
        </>

    )
}
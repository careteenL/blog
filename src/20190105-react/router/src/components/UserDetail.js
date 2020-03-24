import React, { useState, useEffect } from 'react';
export default function (props) {
    console.log('UserDetail.props', props);
    //let currentUser = props.location.state;
    //location.state就是用来在路由跳转换时间进行传值的
    let user = props.location.state;
    /*  if (!user) {
         let usersStr = localStorage.getItem('users');
         let users = usersStr ? JSON.parse(usersStr) : [];
         user = users.find(user => user.id === props.match.params.id);
     } */
    return (
        <div>
            <p>ID:{user.id}</p>
            <p>用户名:{user.username}</p>
        </div>
    )
}
//hash history 基于  hash实现的跟 window.history无关
// browser history 就是基于window.history实现的
//不是不是 browser 上线的时候要nginx 配置一下映射的
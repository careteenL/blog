import React from 'react';
import ReactDOM from 'react-dom';
//JSX JavaScript+XML(HTML)  一种把js和html混合书写的语法,这个语法浏览器是不支持的
//{}表达式 里在要放表达式 变量和变量和值组合  1+1 name name+1
let style = { border: '1px solid red' };
let element1 = <h1
    style={style}
    id="hello"
    className="title">hello</h1>;
//在babel转译的时候会把element1这种形式转成element2这种形式
//创建React元素
//let element2 = React.createElement("h1", null, "hello");
//console.log(element2);
//element2={type:'h1',props:{children:'hello'}}
console.log(element1);
ReactDOM.render(element1, document.getElementById('root'));
/**
 *1. jsx只是一个语法糖，最终会被编译成React.createElement
 *2. ReactElement是构建React应用的最小单位
 *3. React元素是用来描述你界面上看到的内容
 *4. React元素其实就是一个普通的JS对象。 {type:'h1',props:{children:'hello'}}
  5. React会按照这个普通的JS对象在界面会绘制对应内容
 */
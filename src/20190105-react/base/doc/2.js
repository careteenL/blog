import React from 'react';
import ReactDOM from 'react-dom';
//JSX其实是一个变量，可以用在if 和for循环里

/* function greeting(name) {
    return (
        <div>Hello {name}</div>
    )
}
let element = greeting('zhufeng'); */
//Each child in a list should have a unique "key" prop.
//在一个列表中的每个孩子，应该有一个唯一的 key属性
let names = ['1', '2', '3'];
let lis = [];

for (let i = 0; i < names.length; i++) {
    lis.push(<li key={i}>{names[i]}</li>);
}
//为什么要区分？将在要domdiff用来进行优化
ReactDOM.render(<ul>{lis}</ul>, document.getElementById('root'));
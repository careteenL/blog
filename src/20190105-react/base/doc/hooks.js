import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 当要渲染的时候，会去执行这个函数，然后拿到返回的React元素进行渲染
 * @param {} props 
 */
function Counter(props) {
    //第1个元素是状态本身，第二个元素是改变状态的方法
    let [count, setCount] = useState(0);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
ReactDOM.render(<Counter />, document.getElementById('root'));
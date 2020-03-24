import React from 'react';
import ReactDOM from 'react-dom';
/**
 * useState
 * 1.类有实例 ，而且 类不能轻易销毁，而且 类的上属性很多。管理起来也麻烦，也难以销毁
 * 2.多用函数组件，而少用类组件。但是函数组件没有状态，也没有生命周期
 * 3.useState主是在函数里没有实例的情况下使用状态
 */
let count;
function useState(initialState) {
    count = initialState;
    function setCount(newCount) {
        count = newCount;
    }
    return [count, setCount];
}
function Counter(props) {
    let [count, setCount] = useState(0);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
ReactDOM.render(<Counter />, document.getElementById('root'));
import React from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/counter';
function Counter(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={props.add}>+</button>
            <button onClick={() => props.delayAdd()}>1秒后加1</button>
            <button onClick={() => props.delayAdd2()}>1秒后加2</button>
        </div>
    )
}
//  store.getState(); connect是调用此函数，传入store.getState(),返回值将会成为当前
//组件的属性对象
export default connect(
    state => state.counter,
    actions
)(Counter);
import React, { useState, useEffect, useContext } from 'react';
import { bindActionCreators } from '../redux';
import * as TYPES from '../store/action-types';
//import store from '../store';
import actions from '../store/actions/counter2';
//import ReactReduxContext from '../react-redux/Context';
import { connect } from '../react-redux';
//let boundActions = bindActionCreators(actions, store.dispatch);
/**
 * 这个订阅方法不需要每次组件刷新都要执行
 * useEffect的第二个参数是依赖变量的数组
 * useEffect里的函数需要返回一个销毁的函数,此销毁会自动在组件销毁的时候调用
 * @param {*} props 
 */
function Counter(props) {
    /*  let { store } = useContext(ReactReduxContext);
     let [number, setNumber] = useState(props.number);
     useEffect(() => {
         return store.subscribe(() => {
             setNumber(store.getState().counter2.number);
         });
          let timer = setTimeout();
         return function(){
             clearTimeout(timer);
         } 
     }, []); */
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={props.add}>+</button>
            <button onClick={props.minus}>-</button>
        </div>
    )
}
let mapStateToProps = state => state.counter2;
//let mapDispatchToProps = actions;
//connect内部，会先把actions进行绑定，然后把绑定后的结果对象作为当前组件的属性对象
export default connect(
    mapStateToProps,
    actions
)(Counter);
/**
 * 对于组件来说，仓库有二个作用
 * 1. 输入 把仓库中的状态在组件中显示
 * 2. 输出 在组件里可以派发动作给仓库，从而修改仓库中的状态
 * 3. 组件需要订阅仓库中的状态变化事件，当仓库中状态发生改变的时候要重新刷新组件
 */

/* class Counter extends React.Component {
   state = { number: store.getState().number }
   componentDidMount() {
       //当仓库中的状态发生更新后，会让订阅函数执行.会更新当前组件的状态，状态更新后就会刷新组件
       this.unSubscribe = store.subscribe(() => {
           this.setState({ number: store.getState().number });
       });
   }
   componentWillUnmount() {
       this.unSubscribe();
   }
   render() {
       return (
           <div>
               <p>{this.state.number}</p>
               <button onClick={() => store.dispatch({ type: TYPES.ADD })}>+</button>
               <button onClick={() => store.dispatch({ type: TYPES.MINUS })}>-</button>
           </div>
       )
   }

} */
/**
 * 这些方法的原因
 * 1. 想减化，想省事，想更不容易出错
 * 2.  或者说有些需要必须要引入这个逻辑
 */
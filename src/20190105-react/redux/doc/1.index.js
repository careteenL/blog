
/**
 * JS作用域 只有两个 一个是全局作用域，一个是函数作用域
 */
/**
 * 处理器  
 * @param {*} state 老状态
 * @param {*} action  动作对象 要求必须是一个普通对象，必须要有一个type属性 
 */
const CHANGE_COLOR = 'CHANGE_COLOR';///动作的类型 修改颜色
//初始状态
//color颜色 updateCount修改颜色的次数
let initialState = { color: 'red', updateCount: 0 };
//保安已经培训好了，可以上岗了
function reducer(state = initialState, action) {// {type:CHANGE_COLOR,payload:'green'}
    if (action.type === CHANGE_COLOR) {
        return { ...state, color: action.payload, updateCount: state.updateCount + 1 };
    }
    return state;
}
/**
 * Redux应用只有一个仓库，仓库里只有一个状态
 * @param {*} reducer 
 * @param {*} initialState 
 */
function createStore(reducer, initialState) {
    let state = initialState;//状态
    let listeners = [];
    function getState() {//获取当前的状态
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        //不管你传的是什么动作，不管有没有引起状态的改变，都要执行监听函数
        listeners.forEach(listener => listener());
    }
    //在仓库创建的时候会先派发一次动作，目的是为了给初始化状态赋值
    dispatch({ type: '@@REDUX_INIT' });
    function subscribe(listener) {
        listeners.push(listener);
        return function () {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
            //listeners = listeners.filter(item != listener)
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}
let initialState2 = { color: 'green', updateCount: 0 };
//redux的仓库 仓库就是一个对象
let store = createStore(reducer);
console.log(store.getState());
store.dispatch({ type: "XXX", payload: 'yellow' });
/**
store.subscribe(() => {
    console.log(store.getState());
});
store.dispatch({ type: CHANGE_COLOR, payload: 'yellow' });
store.dispatch({ type: CHANGE_COLOR, payload: 'green' });
store.dispatch({ type: CHANGE_COLOR, payload: 'black' });
 */


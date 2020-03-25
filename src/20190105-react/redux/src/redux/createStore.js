export default function createStore(reducer, initialState) {
    let state = initialState;//状态
    let listeners = [];
    function getState() {//获取当前的状态
        return state
    }
    function dispatch(action) {
        state = reducer(state, action);
        //不管你传的是什么动作，不管有没有引起状态的改变，都要执行监听函数
        listeners.forEach(listener => listener());
        return action;
    }
    //在仓库创建的时候会先派发一次动作，目的是为了给初始化状态赋值
    dispatch({ type: '@@REDUX_INIT' });
    function subscribe(listener) {
        listeners.push(listener);
        return function () {//返回一个取消订阅的函数
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

/* function reducer(state = {}, action) {
    let nextState = {};
    for (let key in reducers) {//key=counter1
        let reducerForKey = reducers[key];//counter1
        let previousStateForKey = state[key];//{number:0}
        let nextStateForKey = reducerForKey(previousStateForKey, action);
        nextState[key] = nextStateForKey;
    }
    return nextState;
} */
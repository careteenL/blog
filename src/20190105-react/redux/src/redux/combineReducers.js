export default function combineReducers(reducers) {
    //state是合并后的state={counter1:{number:0},counter2:{number:0}}
    return function (state = {}, action) {
        let nextState = {};
        for (let key in reducers) {//key=counter1
            let reducerForKey = reducers[key];//counter1
            let previousStateForKey = state[key];//{number:0}
            let nextStateForKey = reducerForKey(previousStateForKey, action);
            nextState[key] = nextStateForKey;
        }
        return nextState;
    }
}
import compose from './compose';
export default function applyMiddleware(...middlewares) {//middleware=logger
    return function (createStore) {
        return function (reducer) {//增强版的createStore方法
            let store = createStore(reducer);//返回的原始的，未修改过的store
            let dispatch;//刚开始的时候dispatch=undefined
            let middlewareAPI = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return { ...store, dispatch }
        }
    }
}
/**
 * 三个中间件 promise, thunk, logger
 * compose(promise, thunk, logger);
 * function(dispatch){
 *    return promise(thunk(logger(dispatch)));
 * }
 * promise(thunk(logger(dispatch)));=改造后的dispatch方法
 */
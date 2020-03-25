import { createStore, compose, applyMiddleware } from '../redux';
import counter from './reducers/counter';
/**
 * 不同的中间件虽然业务不一样，功能不一样，但是它的签名是一样的，代码结构是一样的
 * dispatch 类似于store.dispatch 用来派发动作
 * getState  store.getState() 用来获取最新的仓库状态
 * 比如说现在有一个需求  number初始值=100 当我点击-号的时候，让number向下减，减至0停下来 
 * 为什么不能是store.dispatch,而需要最终重写后的 dispatch
 * 是为了让我们在中间件里可以重头再来，重新派发 
 */
function logger({ dispatch, getState }) {
    return function (next) {//后面要实现中间件级联 next代表调用下一个中间件或者store.dispatch
        return function (action) {//store.dispatch 这个函数就是重写后的dispatch方法了
            console.log('老状态', getState());
            next(action);//store.dispatch(action)
            console.log('新状态', getState());
        }
    }
}
/* function logger({ dispatch, getState }, next, action) {
    console.log('老状态', getState());
    next(action);//store.dispatch(action)
    console.log('新状态', getState());
} */
//使用thunk 中间件可让你派发一个函数
function thunk({ dispatch, getState }) {
    return function (next) {//后面要实现中间件级联 next代表调用下一个中间件或者store.dispatch
        return function (action) {//store.dispatch 这个函数就是重写后的dispatch方法了
            if (typeof action === 'function') {
                action(dispatch, getState);
            } else {
                next(action);
            }
        }
    }
}

function promise({ dispatch, getState }) {
    return function (next) {//后面要实现中间件级联 next代表调用下一个中间件或者store.dispatch
        return function (action) {//store.dispatch 这个函数就是重写后的dispatch方法了
            //如果action的then属性是一个函数的话，
            if (typeof action.then === 'function') {
                action.then(dispatch);
                // action.then(result => dispatch(dispatch));
            } else {
                next(action);
            }
        }
    }
}



let store = applyMiddleware(promise, thunk, logger)(createStore)(counter);
//store.dispatch=指定向写后dispatch
export default store;
//const store = createStore(counter);
//1.备份老的dispatch方法
//let dispatch = store.dispatch;
//2.中间件的本质是在重写dispatch方法，在重写的方法里添加额外的逻辑
/* store.dispatch = function (action) {
    console.log('老状态', store.getState());
    dispatch(action);
    console.log('新状态', store.getState());
} */
//实现异步,1秒后加1
/* store.dispatch = function (action) {
    setTimeout(function () {
        dispatch(action);
    }, 1000);
} */


/**
 * 希望在仓库状态变更前后打印日志
 * 老状态:
 * 新状态:
 */
/**
 * 1.手工重写dispatch方法，不优雅，也不好维护
 * 2. 如果多个中间件怎么办
 */



/*
function logger({ dispatch, getState }) {
    return function (next) {//后面要实现中间件级联 next代表调用下一个中间件或者store.dispatch
        return function (action) {//store.dispatch 这个函数就是重写后的dispatch方法了
              console.log('老状态', getState());
              next(action);//store.dispatch(action)
              console.log('新状态', getState());
if (action.type == 'MINUS') {
    setTimeout(() => {
        next(action);//store.dispatch直接 改状态 减少1 1000=>999
        if (getState().number > 0) {
            dispatch(action);
        }
    }, 1000);

} else {
    next(action);
}
        }
    }
}
*/
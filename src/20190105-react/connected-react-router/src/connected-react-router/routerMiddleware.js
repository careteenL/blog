
import { CALL_HISTORY_METHOD } from './types';
export default function routerMiddleware(history) {
    return function ({ dispatch, getState }) {
        //next=老的原始的store.dispatch
        return function (next) {
            //这个函数将成成为重写后的store.dispatch
            return function (action) {
                console.log('这是重写后dispatch', action);
                if (action.type === CALL_HISTORY_METHOD) {
                    //路由里面 最终靠的都是history
                    //history.push('/counter');
                    history[action.payload.method](...action.payload.args);
                } else {
                    next(action);
                }
            }
        }
    }
}
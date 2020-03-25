//这个函数是用来创建action的
//这样用来创建action的函数被称为actionCreator
import * as TYPES from './action-types';

export default {
    add() {
        //return store.dispatch({ type: TYPES.ADD });
        return { type: TYPES.ADD };
    },
    minus() {
        //return store.dispatch({ type: TYPES.MINUS });
        return { type: TYPES.MINUS };
    },
    //obj.__proto__=Object.prototype
    //正常的action必须是一个纯对象，不能是函数 {type:'add'}
    thunkAdd() {
        //function.__proto__=Function.prototype
        return function (dispatch, getState) {
            setTimeout(function () {
                dispatch({ type: TYPES.ADD });
            }, 1000);
        }
    },
    promiseAdd() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ type: TYPES.ADD });
            }, 1000);
        });
    }
}
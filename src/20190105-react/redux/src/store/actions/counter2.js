//这个函数是用来创建action的
//这样用来创建action的函数被称为actionCreator
import * as TYPES from '../action-types';

export default {
    add() {
        //return store.dispatch({ type: TYPES.ADD });
        return { type: TYPES.ADD2 };
    },
    minus() {
        //return store.dispatch({ type: TYPES.MINUS });
        return { type: TYPES.MINUS2 };
    }
}
//call cps apply
import { call, apply, cps } from 'redux-saga/effects';
import { delay, readFile } from '../../util';

export function* callFn() {
    //告诉 middleware我要调用delay方法，1000是传给delay的参数。
    //call调用的方法一定要返回一个promise.然后middleware会等待promise完成
    //let result = yield call(delay, 1000, true);
    //[context,fn] fn.call(context,1000,2000);
    //let result = yield call([{ name: 'careteen' }, delay], 1000, 2000);
    //let result = yield apply({ name: 'careteen' }, delay, [1000, 2000]);//delay.apply({},[1000,2000]);
    //let result = yield cps(readFile, 1000, '文件名');// delay(1000,'文件名')

    /*  try {
         let result = yield call(delay, 1000, false);
         alert('成功');
     } catch (error) {
         console.error(error);
         alert(error);
     } */

    let result = yield call(delay, 1000, false);
    if (result.code == 0) {
        alert(result.data);
    } else {
        alert(result.error);
    }
}


/* function call(fn, ...args) {
    return {
        type: 'CALL',
        fn,
        args
    }
}

let result = await fn(...args);
*/
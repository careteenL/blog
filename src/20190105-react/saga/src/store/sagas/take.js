
import { takeEvery, put, all, take } from 'redux-saga/effects';
import * as types from '../action-types';
const delay = (ms) => new Promise(function (resolve) {
    setTimeout(() => {
        resolve();
    }, ms);
});
function* delayAdd(action) {
    yield delay(1000);
    yield put({ type: types.ADD, payload: action.payload });
}

export default function* watcherDelayAdd() {
    //等待一次DELAY_ADD的动作派发，如果等不到，就卡在这个地方就不动了，不会继续向下执行
    /* let action = yield take(types.DELAY_ADD);
    yield delayAdd(action);
    action = yield take(types.DELAY_ADD);
    yield delayAdd(action);
    action = yield take(types.DELAY_ADD);
    yield delayAdd(action); */
    //yield takeEvery(types.DELAY_ADD, delayAdd);
    while (true) {
        let action = yield take(types.DELAY_ADD);
        yield delayAdd(action);
    }
    console.log('after while true');//while true后面的代码永远不会执行了
}
/**
 * takeEvery一直在等，每次派发都会执行
 * take只等一次，等不到一直等，等到就不再等了
 *
 * takeEVery会开启一个子进程，去单独执行while (true) ，不会阻塞当前代码
 */
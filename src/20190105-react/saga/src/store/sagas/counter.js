
import { takeEvery, put, all } from 'redux-saga/effects';
import * as types from '../action-types';
const delay = (ms) => new Promise(function (resolve) {
    setTimeout(() => {
        resolve();
    }, ms);
});
/**
 * takeEvery 监听每一个特定的动作，当监听到这个动作之后，会执行真正的workerSaga
 */
//saga=generator
function* delayAdd(action) {
    //delay(1000) 会返回一个promise,这个promise会在1秒后变成resolved状态。等这个promise成功后会继续向下执行
    yield delay(1000);
    yield put({ type: types.ADD, payload: action.payload });//put也会用来生成effect，表示要向仓库派发动作 store.dispatch({ type: types.ADD });
}
function* delayAdd2(action) {
    //delay(1000) 会返回一个promise,这个promise会在1秒后变成resolved状态。等这个promise成功后会继续向下执行
    yield delay(1000);
    yield put({ type: types.ADD, payload: 1 });//put也会用来生成effect，表示要向仓库派发动作 store.dispatch({ type: types.ADD });
    yield put({ type: types.ADD, payload: 1 });
}
export default function* watcherDelayAdd() {
    //监听DELAY_ADD的动作，监听到之后会启动delayAdd执行
    //类似于在node子的子进程 child_process 
    //node里是单进程单线程的。
    yield takeEvery(types.DELAY_ADD, delayAdd);
    console.log('takeEvery 1');
    yield takeEvery(types.DELAY_ADD2, delayAdd2);
    console.log('takeEvery 2');
}
//takeEvery相当于是另起了一个线程单独执行，当前saga会立刻往下执行

//给saga middleware之后，sagaMiddleware会知道 你想派发动作，store.dispatch(action);
/* function put(action) {
    return {
        type: 'PUT',
        action
    }
} */
/**
 * 正常来说，在saga里面 或者说在generator里面是需要上一个执行完了才执行下一个
 *
 */
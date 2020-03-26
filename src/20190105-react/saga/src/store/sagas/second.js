import { takeEvery, put, all, call, race, take } from 'redux-saga/effects';
import * as types from '../action-types';
import { ReactReduxContext } from 'react-redux';
const delay = (ms) => new Promise(function (resolve) {
    setTimeout(() => {
        resolve();
    }, ms);
});
function* start() {
    while (true) {
        yield delay(1000);
        yield put({ type: types.ADD });
    }
}
function* stop() {
    yield take(types.CANCEL_SECOND);
    console.log('CANCEL_SECOND');
    return '我是停止方法的返回值';
}
export default function* () {
    /*   let result = yield race({
          start: call(start),
          stop: call(stop)
      }) */
    let result = yield race([
        call(start),
        , call(stop)
    ])
    console.log('result', result);
}
//call js call xx.call();
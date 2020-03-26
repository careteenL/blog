
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import * as types from '../action-types';
import { login, setItem, clearItem } from '../../Api';

function* loginRequest(userInfo) {//worker saga
    try {
        setItem('loading', 'true');
        let token = yield call(login, userInfo);
        yield put({
            type: types.STORE_SESSION,
            payload: userInfo.username
        });
        setItem('token', token);
    } catch (error) {
        yield put({
            type: types.LOGIN_ERROR,
            payload: error
        });
    } finally {
        setItem('loading', 'false');
    }
}
export default function* loginFlow() {//监听saga 干活执行业务
    while (true) {
        let action = yield take(types.LOGIN_REQUEST);
        //fork的意思就是非阻塞调用loginRequest，当前的saga不会阻塞，会立刻向下执行
        const task = yield fork(loginRequest, action.payload);
        //如果发起了登录请求之后，在的登录的响应结果没有到来之前，我们点了退出按钮，则需要取消登录这个任务
        action = yield take([types.LOGOUT_REQUEST, types.LOGIN_ERROR]);//登录成功之后要等用户派发退出登录的请求
        if (action.type === types.LOGOUT_REQUEST) {
            yield cancel(task);
        }
        yield put({
            type: types.STORE_SESSION,
            payload: null
        });
        clearItem('token');
    }
}
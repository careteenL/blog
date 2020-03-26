import { all } from 'redux-saga/effects';
import second from './second';


export default function* rootSaga() {
    yield all([
        second()
    ])
}
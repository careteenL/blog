import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducers);
//通过调用run方法可以让rootSaga开始启动执行
sagaMiddleware.run(rootSaga);
//run(rootSaga);
/* function run(rootSaga) {
    //1.通过生成器函数得到迭代器，然后调用next方法可以让迭代器执行
    let it = rootSaga();
    it.next();
} */
export default store;

//sagaMiddleware就是类似于co
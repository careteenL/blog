const delay = (ms) => new Promise(function (resolve) {
    setTimeout(() => {
        resolve();
    }, ms);
});
function put(action) {
    return {
        type: 'PUT',
        action
    }
}
function* delayAdd() {
    //delay(1000) 会返回一个promise,这个promise会在1秒后变成resolved状态。等这个promise成功后会继续向下执行
    yield delay(1000);
    yield put({ type: types.ADD });//put也会用来生成effect，表示要向仓库派发动作 store.dispatch({ type: types.ADD });
}
//delayAdd 里面放了两个 yield，不是执行两次 next 才完成吗?yes or no
//sagaMiddle是一个调试引擎或者叫执行器
let it = delayAdd();
let { value: delayPromise } = it.next();
delayPromise.then(result => {
    let { value: putAction } = it.next();
    if (putAction.type === 'PUT') {
        store.dispatch(putAction.action);
    }
});

//tj co 自动执行generator 的工具 

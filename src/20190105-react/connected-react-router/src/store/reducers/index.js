import { combineReducers } from 'redux';
import counter from './counter';
import history from '../../history';
import { connectRouter } from '../../connected-react-router';
let combinedReducer = combineReducers({
    counter,
    //connectRouter是个函数数，它会返回一个reducer,这个reducer是用来把路径信息保存到仓库里面去的
    router: connectRouter(history)
});
// state.router就可以仓库中获取最新的路径信息了
export default combinedReducer;
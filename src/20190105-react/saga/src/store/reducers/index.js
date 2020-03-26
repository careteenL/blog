import { combineReducers } from 'redux';
import counter from './counter';
import login from './login';
let combinedReducer = combineReducers({
    counter,
    login
});
// state.router就可以仓库中获取最新的路径信息了
export default combinedReducer;
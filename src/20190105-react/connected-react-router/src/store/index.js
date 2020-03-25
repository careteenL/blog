import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { routerMiddleware } from '../connected-react-router';
import history from '../history';
//let middleware = routerMiddleware(history);
//let store = createStore(reducers);
let store = applyMiddleware(routerMiddleware(history))(createStore)(reducers);
window._store = store;

export default store; 
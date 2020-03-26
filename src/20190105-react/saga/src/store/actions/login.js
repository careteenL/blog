
import * as types from '../action-types';
export default {
    login(username, password) {
        //需要一个saga去监听LOGIN_REQUEST动作
        return {
            type: types.LOGIN_REQUEST,
            payload: {
                username,
                password
            }
        };
    },
    logout() {
        return {
            type: types.LOGOUT_REQUEST
        }
    },
    setToken(token) {
        return {
            type: types.STORE_SESSION,
            payload: token
        }
    }
}
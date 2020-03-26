export const ADD = 'ADD';

export const DELAY_ADD = 'DELAY_ADD';
export const DELAY_ADD2 = 'DELAY_ADD2';


/**
 * 登录流程需要什么动作
 *  开始登录
 *  登录成功
 *  登录失败
 *  用户名保存到仓库中
 *  退出的登录
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';  //发起登录请求
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';  //登录成功
export const STORE_SESSION = 'STORE_SESSION';  //登录成功要把用户名保存到仓库中
export const LOGIN_ERROR = 'LOGIN_ERROR';      //登录失败
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';//发起退出登录请求

export const CANCEL_SECOND = 'CANCEL_SECOND'

export function login(userInfo) {//{username,password}
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            reject(userInfo.username + userInfo.password);
        }, 3000);
    });
}

/**
 * 要想数据刷新后还在，需要把token保存到 localStorage里去
 */
export function setItem(key, value) {
    localStorage.setItem(key, value);
}
export function getItem(key) {
    return localStorage.getItem(key);
}
export function clearItem(key) {
    localStorage.removeItem(key);
}

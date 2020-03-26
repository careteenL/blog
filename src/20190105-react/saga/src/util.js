//什么会用context，就是我们需要绑定方法里的this指针的时候
export function delay(ms, flag) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            /*  if (flag) {
                 resolve();
             } else {
                 reject('失败了');
             } */
            if (flag) {
                resolve({ code: 0, data: '成功' });
            } else {
                resolve({ code: 1, error: '失败' });
            }
        }, ms);
    });
}

export function readFile(ms, filename, callback) {
    setTimeout(() => {
        callback(null, filename);
    }, ms);
}
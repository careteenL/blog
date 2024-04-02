/**
 * @desc 实现控制异步最大并发数
 */
class LimitPromise {
  constructor(limit) {
    this._limit = limit; // 最大限制数
    this._count = 0; // 目前并发的数量
    this._taskQueue = []; // 如果并发数等于最大限制，则把新加的异步操作用数组存起来
  }
}

LimitPromise.prototype.call = function(asyncFn, ...args) {
  return new Promise((resolve, reject) => {
    const task = this.createTask(asyncFn, args, resolve, reject);
    if (this._count >= this._limit) {
      this._taskQueue.push(task);
    } else {
      task();
    }
  });
};

LimitPromise.prototype.createTask = function(asyncFn, args, resolve, reject) {
  return () => {
    asyncFn(...args)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this._count--;
        if (this._taskQueue.length) {
          let task = this._taskQueue.shift();
          task();
        }
      });

    this._count++;
  };
};

let limitP = new LimitPromise(3);

function sleep(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("等待了" + sec + "秒");
      resolve(`${sec}s`);
    }, sec * 1000);
  });
}

// limitP.call(sleep, 1); // 1秒后打印
// limitP.call(sleep, 2); // 2秒后打印
// limitP.call(sleep, 3); // 3秒后打印
// limitP.call(sleep, 4); // 5秒后打印 1 + 4
// limitP.call(sleep, 5); // 7秒后打印 2 + 5
// limitP.call(sleep, 6); // 9秒后打印 3 + 6

limitP.call(sleep, 1); // 1秒后打印
limitP.call(sleep, 1); // 1秒后打印
limitP.call(sleep, 2); // 2秒后打印
limitP.call(sleep, 3); // 1 + 3 秒后打印
limitP.call(sleep, 3); // 1 + 3 秒后打印
limitP.call(sleep, 3); // 2 + 3 秒后打印

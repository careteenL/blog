// 防抖 + 节流
// debounce 就是上来后 先开一个定时 只要一直点击  到时间什么都不做 就在开一个定时器
function debounce(func, wait, opts = {}) {
  let maxWait;
  if ('maxWait' in opts) {
    maxWait = opts.maxWait;
  }
  let leading = true; // 第一次点击时触发
  let trailing = true; // 最后一次也要触发
  // loadash 定时器实现的
  let lastCallTime; // 最后调用的时间 previous
  let timeout;
  let lastThis; // 返回函数的this
  let lastArgs; // 返回函数的参数
  // shouldInvoke 是否应该调用
  let lastInvokeTime;
  let shouldInvoke = function (now) {
    let sinceLastTime = now - lastCallTime;
    let sinceLastInvoke = now - lastInvokeTime;
    // 第一次
    return lastCallTime === undefined || sinceLastTime > wait || sinceLastInvoke >= maxWait;
  }
  // leadingEdge 是否第一次执行
  let invokeFunc = function (time) {
    lastInvokeTime = time; // 最终的调用函数的时间
    func.apply(lastThis, lastArgs);
  }
  // startTimer就是开启了一个定时器
  let startTimer = function (timerExpired, wait) {
    timeout = setTimeout(timerExpired, wait);
  }
  let remainingWait = function (now) {
    return wait - (now - lastCallTime);
  }
  let trailingEdge = function (time) {
    timeout = undefined;
    if (trailing) {
      invokeFunc(time);
    }
  }
  let timerExpired = function () {
    let now = Date.now(); // 当前定时器到时间了 看看是否需要执行这个函数
    if (shouldInvoke(now)) { // 如果需要调用
      // 触发结束的方法
      return trailingEdge(now);
    }
    startTimer(timerExpired, remainingWait(now));
  }
  let leadingEdge = function (time) {
    lastInvokeTime = time;
    if (leading) { // 需要执行就调用函数
      invokeFunc(time)
    }
    startTimer(timerExpired, wait); // 开启一个定时器 看下一次定时器到了 是否需要执行func
  }
  let debounced = function (...args) {
    lastThis = this;
    lastArgs = args;
    let now = Date.now();
    // 判断当前的debounce时是否需要执行
    let isInvoking = shouldInvoke(now);
    lastCallTime = now;
    if (isInvoking) {
      if (timeout === undefined) {
        leadingEdge(now);
      }
    }
  }
  return debounced;
}
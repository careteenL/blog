function throttle(func,wait) {
  return debounce(func, wait,{ // maxWait最大的点击时间
    maxWait:wait
  });
}
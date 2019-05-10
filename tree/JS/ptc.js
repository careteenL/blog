/**
 * @question 计算1-N的累加值（尾递归）
 * @tip 若要开启尾递归优化
  ```shell
    node --harmony_tailcalls ptc.js
  ```
 */
'use strict';
function f (n, sum = 1) {
  if (n <= 1) {
    return sum;
  }
  return f(n - 1, sum + n);
}
var result = f(100000);
console.log(result);

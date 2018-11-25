/**
 * @desc 函数调用多少次执行
 * @param {Number} times 触发需要调用的次数
 * @param {Function} cb 
 */
const after = (times = 1, cb = _defaultCb) => {
  return function () {
    if (--times === 0) {
      cb()
    }
  }
}

const _defaultCb = () => {}

// 测试用例
let fn = after(3, () => {
  console.log('该执行了')
})
fn()
fn()
fn() // => 该执行了
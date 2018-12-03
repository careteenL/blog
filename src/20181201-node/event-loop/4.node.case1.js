// 当前例子请在Node环境下运行
// case1
Promise.resolve().then(() => {
  console.log('then1')
  setTimeout(() => {
    console.log('timer1')
  }, 0)
})
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(() => {
    console.log('then2')
  })
}, 0)
// => then1 -> timer2 -> then2 -> timer1
// or then1 -> timer2 -> timer1 -> then2

// case2
setTimeout(() => {
  console.log('timeout')
}, 0)
setImmediate(() => {
  console.log('setImmediate')
})
// => setImmediate -> timeout
// or timeout -> setImmediate

// case3
let fs = require('fs')
fs.readFile('1.setImmediate.html', () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('setImmediate')
  })
})
// => setImmediate -> timeout

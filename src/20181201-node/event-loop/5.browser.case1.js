// 当前例子请在浏览器环境下运行

Promise.resolve().then(() => {
  console.log('then1')
  setTimeout(() => {
    console.log('timer1')
  }, 0)
})
console.log('start')
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(() => {
    console.log('then2')
  })
}, 0)
// => start -> then1 -> timer2 -> then2 -> timer1
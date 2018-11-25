/**
 * @desc 同一个promise可以then多次
 */ 
let Promise = require('./3.1.promise.js')

let p = new Promise((resolve,reject) => {
  resolve('xx')
})

p.then((data) => {
  console.log('p success',data)
}, (err) => {
  console.log(err)
})

p.then((data) => {
  console.log('p second success',data)
}, (err) => {
  console.log(err)
})

// 异步问题  ---- 尚未解决
let p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

p2.then((data) => {
  console.log('p2 success',data)
}, (err) => {
  console.log(err)
})

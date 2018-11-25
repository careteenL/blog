/**
 * @desc 链式调用
 */ 
let Promise = require('./3.3.promise.js')

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

// promise 中 每次调用then 都应该返回一个新的promise 
// promise的实例只能成功或者失败  不能既成功又失败
p.then((data) => {
  console.log('p success', data)
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log('success then', data)
}, (err) => {
  console.log(err)
})

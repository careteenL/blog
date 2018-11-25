/**
 * @desc 异步问题
 */ 
let Promise = require('./3.2.promise.js')

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
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

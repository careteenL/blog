/**
 * @desc 完整promise
 */ 
let Promise = require('./3.6.promise.js')

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('step1')
  }, 1000)
})

// 正常调用
p.then((data) => {
  console.log(data)
  return 'step2'
}).then((data) => {
  console.log(data)
  return 'step3'
}).then((data) => {
  console.log(data)
  return 'step4'
}).catch((data) => {
  console.log(data, 'catch')
}).finally((data) => {
  console.log(data, 'finished')
})

// 中断Promise调用链
const needBreak = true
p.then((data) => {
  console.log(data)
  return 'step2'
}).then((data) => {
  console.log(data)
  if (needBreak) {
    // 抛出异常or Promise.reject
    // throw 'break'
    return Promise.reject('break')
  }
  return 'step3'
}).then((data) => {
  console.log(data)
  return 'step4'
}).catch((data) => {
  console.log(data, 'catch')
}).finally((data) => {
  console.log(data, 'finished')
})

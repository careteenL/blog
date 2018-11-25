/**
 * @desc 完整promise
 */ 
let Promise = require('./3.4.promise.js')

// 普通返回值
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})
p.then((data) => {
  console.log(`p success ${data}`)
  return 'first result'
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p success then ${data}`)
}, (err) => {
  console.log(`p error ${err}`)
})

// 抛错
let p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p2 xxx')
  }, 1000)
})
p2.then((data) => {
  throw new Error('just happy')
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p2 success then ${data}`)
}, (err) => {
  console.log(`p2 error ${err}`)
})

// promise
let p3 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p3 xxx')
  }, 1000)
})
p3.then((data) => {
  return new Promise((resolve, reject) => {
    resolve('p3 data')
  }).then(data => {
    return data
  })
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p3 success then ${data}`)
}, (err) => {
  console.log(`p3 error ${err}`)
})

// 循环引用 - 例子待改
let p4 = new Promise((resolve,reject) => {
  let circleP = new Promise((resolve, reject) => {
    resolve(circleP)
  })  
  return circleP
})
p4.then((data) => {
  console.log(data)
})
/**
 * @desc 完整promise
 */ 
let Promise = require('./3.6.promise.js')

// 模拟一个耗时1000的接口
let fetchData = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('result')
  }, 1000)
})

// 使用Promise.race去取消一个Promise
let cancelable = (promise, token) => {
  Promise.race([
    promise,
    new Promise((_, reject) => {
      token.cancel = () => {
        reject(new Error('cancel'))
      }
    })
  ]).catch(e => {
    console.log(e)
  })
}

// 调用接口时包裹一层
const token = {}
cancelable(fetchData.then(res => {
  console.log(res, 'success')
}), token)

// 离开页面时期望将没有完成的promise取消掉，也就是不期望他有返回值
const leavePage = () => {
  setTimeout(_ => {
    token.cancel()
  }, 400)
}

leavePage()

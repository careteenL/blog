/**
 * @desc 使用generator实现读取文件
 */ 
const fs = require('fs')
const path = require('path')

const resolvePath = (file) => {
  return path.resolve(__dirname, './static/', file)
}

function read (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath(file), 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function * r() {
   let r1 = yield read('1.txt')
   let r2 = yield read(r1)
   let r3 = yield read(r2)
  return r3
}

function co (it) {
  return new Promise((resolve, reject) => {
    // next方法  express koa  原理 都是这样的
    function next (data) { // 使用迭代函数来实现 异步操作按顺序执行
      let { value, done } = it.next(data)
      if(done){
        resolve(value)
      }else{
        value.then((data) => {
          next(data)
        },reject)
      }
    }
    next()
  })
}
co(r()).then((data) => {
  console.log(data)
})

// let it = r()
// let {value,done} = it.next()
// value.then((data) => { // data->2.txt
//   let {value,done} = it.next(data)
//   value.then((data) => {
//     let { value, done } = it.next(data)
//     value.then((data) => {
//       console.log(data) // data-> 结果
//     })
//   })
// })


// read('1.txt', (err, data) => {
//   return read(data)
// }).then((data) => {
//   return read(data)
// }).then((data) => {
//   return read(data)
// }).then((data) => {
//   console.log(data)
// })

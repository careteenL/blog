/**
 * @desc 通过发布订阅方式解决异步问题
 */ 
let schoolInfo = {}
const fs = require('fs')

// 一个简易的方法订阅对象
let dep = {
  arr: [],
  emit () {
    this.arr.forEach((fn) => {
      fn()
    })
  },
  on (fn) {
    this.arr.push(fn)
  }
}

// 订阅
dep.on(() => {
  // 只有读取了两个文件的内容并赋值以后才会打印
  if (Object.keys(schoolInfo).length === 2){
    console.log(schoolInfo)
  }
})

// 读取触发
fs.readFile('./static/name.txt', 'utf8', (err, data) => {
  schoolInfo['name'] = data
  dep.emit()
})
fs.readFile('./static/age.txt', 'utf8', (err, data) => {
  schoolInfo['age'] = data
  dep.emit()
})
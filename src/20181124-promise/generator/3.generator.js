/**
 * @desc 使一个对象可以被迭代
 */ 
// 生成器 生成的就是迭代器 
// 迭代器是一个对象，对象上有一个next方法，这个方法调用后可以返回 value,done
// 迭代函数
let o = { 0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function () {
  let currentIndex = 0
  let that = this
  return {
    next(){
      return {
        value: that[currentIndex++],
        done: currentIndex-1 === that.length
      }
    }
  }
}}

// 使用generator
let o = {0: 1, 1: 2, 2: 3, length: 3, [Symbol.iterator]: function* () {
    let index = 0
    while (index !== this.length) {
      yield this[index]
      index++
    }
  }
}
let arr = [...o]
console.log(arr) 
// 生成器可以实现生成迭代器，生成器函数 就是再函数关键字中加个* 配合yield来使用
// yield 是有暂停功能的
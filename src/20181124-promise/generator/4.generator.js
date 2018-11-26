/**
 * @desc 使用generator
 */ 
function * say () {
  yield 'node'
  yield 'react'
  yield 'vue'
}
// 如何遍历迭代器 遍历到done 为true时
let it = say()
let flag = false
do{
  let {value, done} = it.next()
  console.log(value)
  flag = done
}while(!flag)

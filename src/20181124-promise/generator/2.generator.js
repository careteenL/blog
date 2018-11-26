/**
 * @desc 展开运算符操作对象
 */ 
// 迭代obj会报错
let obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}
console.log([...obj]) // 默认obj 是不能被迭代的 

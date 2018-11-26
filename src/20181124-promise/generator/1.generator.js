/**
 * @desc 实现一个可传任意个参数的加法函数
 */ 
const sum = () => {
  return [...arguments].reduce((ret, item) => {
    return ret + item
  }, 0)
}

let sum = sum(1, 2, 3, 4)
console.log(`sum ${sum1}`)

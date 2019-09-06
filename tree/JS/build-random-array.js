/**
 * @desc 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
 * @param {*} arr 
 * @param {*} length 
 * @param {*} min 
 * @param {*} max 
 */
const buildRandomArray = (arr, length, min, max) => {
  if (!Array.isArray(arr)) arr = []
  if (length < 1) return []
  if (arr.length === length) return arr
  const randomNum = ~~(Math.random() * (+max - +min)) + +min
  if (!arr.includes(randomNum)) arr.push(randomNum)
  return buildRandomArray(arr, length, min, max)
}

// Test
var ret = buildRandomArray([], 5, 2, 32)
console.log('ret', ret)

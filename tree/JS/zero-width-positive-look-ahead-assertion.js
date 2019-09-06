/**
 * @desc 去掉字符串中最后一个指定字符-零宽正向先行断言的运用
 * @regexp 零宽正向先行断言 参考资料 https://www.kancloud.cn/zhongxia/javascript-regex/184194
 *          它会从要匹配的字符的最右端开始匹配。
 * @param {String} str 
 * @param {String} target 
 */
const delLastStr = (str, target) => {
  const reg = new RegExp(`${target}(?=([^${target}]*)$)`)
  // const ret = str.match(reg)
  // console.log(ret)
  return str.replace(reg, '')
}

// Test
console.log(delLastStr('careteen', 'e'))

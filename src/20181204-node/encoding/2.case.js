const fs = require('mz/fs')
const path = require('path')

// 读取buffer转为json对象
async function read2JSON () {
  let ret = await fs.readFile(path.resolve(__dirname, '2.txt'))
  // let ret = await fs.readFile(path.resolve(__dirname, '../assets/encoding-base64-example.png'))
  console.log(ret.toJSON())
  return ret.toJSON()
}

// 将10进制转为2进制
async function data2b () {
  let data = await read2JSON()
  let ret = []
  data.data.forEach(item => {
    ret.push(item.toString(2))
  })
  console.log(ret)
  return ret
}

// 将2进制拼一起3*8 然后分隔成4*6
async function split () {
  let data = await data2b()
  let dataStr = data.join('')
  let ret = []

  let splitUnit = 6
  let flag = 0
  while (flag < dataStr.length) {
    ret.push(dataStr.substr(flag, splitUnit))
    flag = flag + splitUnit
  }
  console.log(ret)
  return ret
}

// 然后将2进制转成10进制
async function data20 () {
  let data = await split()
  let ret = data.map(item => {
    return parseInt(item, 2)
  })
  console.log(ret)
  return ret
}

// base64码
const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const base64lib = `${lowerCases.toUpperCase()}${lowerCases}${numbers}+/`
console.log(base64lib)

// 取到每一个base64码
async function main () {
  let data = await data20()
  let ret = []
  data.forEach(item => {
    ret.push(base64lib[item])
  })
  console.log(ret.join(''))
  return ret.join()
}

// 调用
main()

// 简化代码
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function transfer (str) {
  let buf = Buffer.from(str)
  let result = ''
  for(let b of buf){
    result += b.toString(2)
  }
  return result.match(/(\d{6})/g).map(val => parseInt(val, 2)).map(val => CHARTS[val]).join('')
}

let fl = transfer('冯')
console.log(fl) // => 5Yav
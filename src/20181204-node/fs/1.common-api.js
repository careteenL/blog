const fs = require('fs')
const path = require('path')

function resolvePath (p) {
  return path.resolve(__dirname, p)
}
// 1 读取文件
// 1.1 异步
fs.readFile(resolvePath('./1.txt'), {
  encoding: 'utf8', 
  flag: 'r'
}, (err, data) => {
  console.log(`async read : ${data}`)
})
// 1.2 同步
let rRet = fs.readFileSync(resolvePath('./1.txt'), {
  encoding: 'utf8', 
  flag: 'r'
})
console.log(`sync read : ${rRet}`)

// 2 写入文件
// 2.1 异步
fs.writeFile(resolvePath('./1.txt'), '我说今晚月光这么美，你说是的。', {
  encoding: 'utf8', 
  flag: 'w',
  mode: 0o666
}, (err, data) => {
  console.log(`async write success`)
})

// 2.1 同步
fs.writeFileSync(resolvePath('./1.txt'), '我说今晚月光这么美，你说是的。', {
  encoding: 'utf8', 
  flag: 'w',
  mode: 0o666  
})

// 3 拷贝文件
// 3.1 异步
fs.copyFile(resolvePath('./1.txt'), resolvePath('./2.txt'), (err, data) => {
  console.log(`async copy success`)
})
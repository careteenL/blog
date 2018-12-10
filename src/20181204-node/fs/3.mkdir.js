const fs = require('fs')
const path = require('path')

const SEP = '/' // 分隔符

function resolvePath (p) {
  return path.resolve(__dirname, p)
}

// 1 简单使用
// fs.mkdir(resolvePath('./3.mkdir/a/b'), {
//   recursive: true
// }, (err) => {
//   if (err) throw err
//   console.log(`async mkdir suceess: `)
// })

// 2 递归创建
// 同步
function mkdirRSync (p) {
  let arr = p.split(SEP)
  for (let i = 0; i < arr.length; i++) {
    let currentDir = arr.slice(0, i + 1).join(SEP)
    try {
      fs.accessSync(resolvePath(currentDir))
    } catch (error) {
      fs.mkdirSync(resolvePath(currentDir))
    }    
  }
}
// mkdirRSync('./3.mkdir/a/b')

// 异步
function mkdirR (p, cb) {
  let arr = p.split(SEP)
  // 需要一个迭代函数去创建计数
  const next = index => {
    if (index === arr.length) return cb && cb()
    let currentDir = arr.slice(0, ++index).join(SEP)
    fs.access(resolvePath(currentDir), err => {
      if (err) {
        fs.mkdir(resolvePath(currentDir), _ => {
          next(index)
        })
      } else {
        next(index)
      }
    })  
  }
  next(0)
}
// mkdirR('./3.mkdir/a/b', _ => {
//   console.log('async mkdirR success')
// })

module.exports = {
  mkdirRSync: mkdirRSync,
  mkdirR: mkdirR
}

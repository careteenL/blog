const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const { mkdirR } = require('./3.mkdir')

function resolvePath (p) {
  return path.resolve(__dirname, p)
}

function joinPath (a, b) {
  return path.join(a, b)
}

// 准备工作 创建多层级目录
//         5.wide -> a -> c
//         5.wide -> b -> d
const mkdirRP = promisify(mkdirR)
async function mkdirMyDir () {
  await mkdirRP('./5.wide/a/c')
  await mkdirRP('./5.wide/b/d')
}
// mkdirMyDir().then(_ => {
//   console.log('async mkdirR success')
// })

// 1 同步 广度优先
function rmdirWideSync (p) {
  let arr = [p] // 队列
  let index = 0 
  let current // 指针
  while (current = arr[index++]) { // 指针往后迭代直到最后一个
    let statObj = fs.statSync(resolvePath(current)) // 取到队列元素的文件状态
    if (statObj.isDirectory()) { // 目录则拿到儿子放入队列
      let dirs = fs.readdirSync(resolvePath(current))
      if (!dirs.length) continue // 空目录直接跳过
      dirs = dirs.map(dir => joinPath(current, dir)) // 拼接成类似 5.wide/a/c
      arr = [...arr, ...dirs] // 放入队列
    } else { // 文件则直接放入队列
      arr.push(current)
    }
  }
  console.log(arr) // [ './5.wide', '5.wide/a', '5.wide/b', '5.wide/a/c', '5.wide/b/d' ]
  // 倒序删除
  for (let i = arr.length - 1; i >= 0; i--) {
    let item = resolvePath(arr[i])
    let statObj = fs.statSync(item)
    if (statObj.isFile()) { // 文件
      fs.unlinkSync(item)
    } else { // 目录
      fs.rmdirSync(item)
    }
  }
  console.log('sync wide rmdirR success')
}
// rmdirWideSync('./5.wide')

// 2 异步 广度优先
function rmdirWide(p, cb) {
  console.log(p)
  cb && cb()
  fs.readdir(resolvePath(p), (err, files) => {
    !function next (i) {
      if(i >= files.length) return
      let child = joinPath(p, files[i])
      fs.stat(resolvePath(child), (err, statObj) => {
        if(statObj.isDirectory()){
          rmdirWide(child, () => next(i + 1))
        } else {
          console.log(child)
          next(i + 1)
        }
      })
    }(0)
  })
}
rmdirWide('./5.wide', _ => {
  console.log(`async wide rmdirR success`)
})
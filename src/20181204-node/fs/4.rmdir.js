const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const { mkdirR } = require('./3.mkdir')

const SEP = '/' // 分隔符

function resolvePath (p) {
  return path.resolve(__dirname, p)
}

function joinPath (a, b) {
  return path.join(a, b)
}

// 准备工作 创建多级目录
//         4.rmdir -> a -> c
//         4.rmdir -> b -> d
const mkdirRP = promisify(mkdirR)
async function mkdirMyDir () {
  await mkdirRP('./4.rmdir/a/c')
  await mkdirRP('./4.rmdir/b/d')
}
// mkdirMyDir().then(_ => {
//   console.log('async mkdirR success')
// })

// 1 简单的异步删除目录
// fs.rmdir(resolvePath('./4.rmdir'), err => {
//   if (err) throw err
//   console.log(`async rmdir success`)
// })

// 2 同步 深度优先 先序
function rmdirRSync (p) {
  // 拿取到当前的文件状态
  let statObj = fs.statSync(resolvePath(p))
  if (statObj.isFile()) { // 文件直接删除
    fs.unlinkSync(resolvePath(p))
  } else { // 目录 取儿子然后进行迭代
    let dirs = fs.readdirSync(resolvePath(p))
    dirs.forEach(dir => { // 迭代儿子
      rmdirRSync(joinPath(p, dir))
    })
    // 此时自己已经是空目录了 删除自己
    fs.rmdirSync(resolvePath(p))
  }

}
rmdirRSync('./4.rmdir')

// 3 异步 深度优先 串行 先序

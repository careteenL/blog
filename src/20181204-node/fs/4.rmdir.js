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
// rmdirRSync('./4.rmdir')

// 3 异步 深度优先 串行 先序
function rmdirR (p, cb) {
  fs.stat(resolvePath(p), (err, statObj) => { // 拿取到当前的文件状态
    if (err) throw Error(err)
    if (statObj.isDirectory()) { // 目录 取儿子然后进行迭代
      fs.readdir(resolvePath(p), (err, dirs) => {
        dirs = dirs.map(dir => joinPath(p, dir))
        function next (index) {
          if (dirs.length === index) return fs.rmdir(resolvePath(p), cb) // 儿子删除完后 删除自己
          rmdirR(dirs[index], _ => next(index + 1)) // 迭代儿子
        }
        next(0)
      })
    } else { // 文件直接删除
      fs.unlink(resolvePath(p), cb)
    }
  })
}
// rmdirR('./4.rmdir', _ => {
//   console.log(`async rmdirR success`)
// })

// 4 异步 深度优先 并行 先序
function rmdirRParallel (p, cb) {
  fs.stat(resolvePath(p), (err, statObj) => { // 拿取到当前的文件状态
    if (err) throw Error(err)
    if (statObj.isDirectory()) { // 目录 取儿子然后进行迭代
      fs.readdir(resolvePath(p), (err, dirs) => {
        dirs = dirs.map(dir => joinPath(p, dir))
        if (dirs.length === 0) fs.rmdir(resolvePath(p), cb) // 儿子删除完后 删除自己
        let index = 0
        function all () {
          index++
          if (index === dirs.length) fs.rmdir(resolvePath(p), cb)
        }
        dirs.forEach(dir => { // 对儿子的迭代 循环的每一次都判断是否所有都执行完毕
          rmdirRParallel(dir, all)
        })
      })
    } else { // 文件直接删除
      fs.unlink(resolvePath(p), cb)
    }
  })  
}
// rmdirRParallel('./4.rmdir', _ => {
//   console.log(`async rmdirR Parallel success`)
// })

// 5 异步(Promise) 深度优先 并行 先序
function rmdirRParallelPromise (p) {
  return new Promise((resolve, reject) => {
    fs.stat(resolvePath(p), (err, statObj) => {
      if (statObj.isDirectory()) {
        fs.readdir(resolvePath(p), (err, dirs) => {
          dirs = dirs.map(dir => joinPath(p, dir))
          dirs = dirs.map(dir => rmdirRParallelPromise(dir)) // 并行执行
          Promise.all(dirs).then(data => { 
            fs.rmdir(resolvePath(p), resolve) // 儿子都删除执行完以后 删除自己
          })
        })
      } else {
        fs.unlink(resolvePath(p), resolve)
      }
    })
  })
}
// rmdirRParallelPromise('./4.rmdir').then(_ => {
//   console.log(`async rmdirR Promise success`)
// })

// 6 异步(Async) 深度优先 并行 先序
let stat = promisify(fs.stat)
let readdir = promisify(fs.readdir)
let unlink = promisify(fs.unlink)
let rmdir = promisify(fs.rmdir)
async function rmdirRParallelAsync (p) {
  let statObj = await stat(resolvePath(p))
  if (statObj.isDirectory()) {
    let dirs = await readdir(resolvePath(p))
    dirs = dirs.map(dir => rmdirRParallelAsync(joinPath(p, dir))) // 迭代儿子
    await Promise.all(dirs) // 并行执行
    await rmdir(resolvePath(p)) // 儿子都删除完以后 删除自己
  } else {
    await unlink(resolvePath(p))
  }
}
// rmdirRParallelAsync('./4.rmdir').then(_ => {
//   console.log(`async rmdirR Async success`)
// })

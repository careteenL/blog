const fs = require('fs')
const path = require('path')

function resolvePath (p) {
  return path.resolve(__dirname, p)
}

// 模拟新的拷贝方法
// 需要用5个字节搞定拷贝操作  文件流
function copy(source, target) {
  fs.open(resolvePath(target), 'w', function (err, wfd) {
    fs.open(resolvePath(source), 'r', function (err, fd) {
      let buffer = Buffer.alloc(5)
      let readPos = 0
      let writePos = 0
      function next() {
        // 0 从buffer 的第0个开始读 或者开始往里写  position 代表的是文件的读取位置 或者写入位置
        fs.read(fd, buffer, 0, 5, readPos, function (err, bytesRead) {
          if (bytesRead > 0) {
            readPos += bytesRead
            fs.write(wfd, buffer, 0, bytesRead, writePos, function (err, written) {
              writePos += written
              next()
            })
          } else {
            fs.close(fd, () => { })
            fs.close(wfd, () => { })
            console.log('copy success')
          }
        })
      }
      next()
    })
  })
}

copy('./1.txt', './1.copy.txt')
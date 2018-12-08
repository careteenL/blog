const path = require('path')

log(path.sep)

log(path.join(__dirname, 'a', 'b'))

log(path.resolve())
log(path.resolve('a', '/c'))

log(path.relative(__dirname, 'buffer'))

log(__filename)
log(path.dirname(__filename))

//basename 获取路径中的文件名
log(path.basename(__filename))
log(path.basename(__filename, '.js'))
log(path.extname(__filename))

// 辅助函数
function log(str) {
  console.log(str)
}
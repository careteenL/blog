/**
 * @desc 实现一个简易的模块化规范
 */ 

const path = require('path')
const fs = require('fs')
const vm = require('vm')

// main
function Module (id) {
  this.id = id // 每个模块的id即当前运行环境下的绝对路径
  this.exports = {}
}

Module._cache = Object.create(null) // 缓存对象

Module.wrap = function (script) {
  return `(function (exports, require, module, __filename, __dirname) {
    ${script}
  })`
}

// 处理文件名
Module._resolveFilename = function (path) {
  return Module._resolveFilePath(path)
}

/* 整体思路：
 * 1. 判断是否是绝对路径
 * 2. 如果路径中已经有扩展名，并且在 _fileExtentions列表中，则查看该文件是否存在
 * 3. 如果没有扩展名，或者扩展名不在 _fileExtentions列表中，则依次尝试 _fileExtentions列表中的扩展名，看有没有符合条件的文件
 * 4. 如果文件存在返回文件名，如果不存在，则返回空字符串
*/
Module._resolveFilePath = function (request) {
  let resolvePath = ''
  let parsePath = ''
  let fileExists = false
  // 处理成绝对路径
  if (path.isAbsolute(request)) {
    resolvePath = request
  } else {
    resolvePath = path.resolve(__dirname, request)
  }
  let ext = path.extname(resolvePath)
  if (ext) {
    if (!Module._fileExtentions.includes(ext)) {
      parsePath = tryExtensions(resolvePath)
    } else {
      try {
        parsePath = tryRealPath(resolvePath)
      } catch (e) {
        console.error(e)
      }
    }
  } else {
    parsePath = tryExtensions(resolvePath)
  }
  return parsePath
}

// 实现模块的自动层级查找 一层一层往根遍历 node_modules
Module._nodeModulePaths = function (from) {
  let nmChars = [ 115, 101, 108, 117, 100, 111, 109, 95, 101, 100, 111, 110 ]
  let nmLen = nmChars.length  
  // 处理成绝对路径
  from = path.resolve(from)
  // 判断是否为根目录 是就直接返回
  if (from === '/')
    return ['/node_modules']

  // 返回各个父层级的 node_modules
  const paths = []
  let p = 0
  let last = from.length
  for (let i = from.length - 1; i >= 0; --i) {
    const code = from.charCodeAt(i)
    if (code === 47/*/*/) {
      if (p !== nmLen)
        paths.push(from.slice(0, last) + '/node_modules')
      last = i
      p = 0
    } else if (p !== -1) {
      if (nmChars[p] === code) {
        ++p
      } else {
        p = -1
      }
    }
  }

  // 加入根 node_modules
  paths.push('/node_modules')

  return paths  
}

// 加载模块
Module._load = function (path) {
  let filename = Module._resolveFilename(path)

  // 尝试读取缓存
  let cachedModule = Module._cache[filename]
  if (cachedModule) {
    return cachedModule.exports
  }
  // 无缓存时新建一个并加入缓存
  let module = new Module(filename)
  Module._cache[filename] = module

  tryModuleLoad(module, filename)
  
  return module.exports
}

// 三种后缀文件处理
Module._extensions = {
  'js' (module, filename) {
    let content = fs.readFileSync(filename, 'utf8')
    module._compile(_stripBOM(content), filename)    
  },
  '.json' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    module.exports = JSON.parse(content)
  },
  '.node' () {
    // 二进制C++可执行文件 带完善
  }
}

Module.prototype._compile = function (content, filename) {
  let wrapper = Module.wrap(content)

  let compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true
  })

  return compiledWrapper.call(this.exports, this.exports, myRequire, this)
}

Module.prototype.load = function (filename) {
  this.filename = filename
  // paths 为遍历规则
  this.paths = Module._nodeModulePaths(path.dirname(filename))  

  let extension = path.extname(filename) || '.js'
  if (!Module._extensions[extension]) extension = '.js'
  Module._extensions[extension](this, filename)  
}

Module.prototype.require = function (path) {
  return Module._load(path)
}

// -------- 一系列辅助函数 --------
function tryRealPath(path) {
  return fs.realpathSync(path)
}

function tryExtensions(resolvePath) {
  let parsePath = ''
  for (let ext of Module._fileExtentions) {
    let requestPath = resolvePath + ext
    try {
      if (tryRealPath(requestPath)) {
        parsePath = requestPath
        fileExists = true
        break
      }
    } catch (e) {
      continue
    }
  }
  return parsePath
}

// 处理文件从gbk转utf-8时得BOM头问题
function _stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1)
  }
  return content
}

// 尝试加载模块
function tryModuleLoad (module, filename) {
  module.load(filename)
}

// 主函数 使用
function myRequire (path) {
  let module = new Module()
  return module.require(path)  
}

// 导出作为全局
window.myRequire = myRequire
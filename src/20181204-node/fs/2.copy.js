const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

let iconvLite = require('iconv-lite')

function resolvePath (p) {
  return path.resolve(__dirname, p)
}

let read = promisify(fs.readFile)
let write = promisify(fs.writeFile)

// 1 第一直觉
async function copyFile (source, target) {
  let chunk = await read(resolvePath(source))
  await write(resolvePath(target), chunk)
}

copyFile('./1.txt', './2.txt')

// 2 编码问题：爬虫爬取别人非utf8编码文件
async function copyFilePo (source, target) {
  let chunk = await read(resolvePath(source))
  // 编码转换
  chunk = iconvLite.decode(chunk, 'gbk').toString()
  await write(resolvePath(target), chunk)
}
copyFilePo('./1.txt', './2.txt')

// 3 编码问题：文件从GBK转为UTF8会出现BOM头问题
function stripBOM (content) {
  if (Buffer.isBuffer(content)) {
    if (content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      return content.slice(3)
    }
  }
  if (content.charCodeAt(0) === 0xFEFF) {
    return content.slice(1)
  }
  return content
}

async function copyFilePt (source, target) {
  let chunk = await read(resolvePath(source))
  await write(resolvePath(target), chunk)
}
copyFilePt('./1.txt', './2.txt')

## 编码那些事

### 目录

- 二进制位、字节基础概念
- JavaScript中的进制
- [进制间的转换](#进制间的转换)
  - 对任意进制的数进行任意进制转换
  - 将任意进制数转换为十进制数
  - [几道关于parseInt的面试题](#几道关于parseInt的面试题)
- [编码发展历史](#编码发展历史)
- [base64编码](#base64编码)
  - [为什么需要base64](#为什么需要base64)

- [如何实现base64](#如何实现base64)
  - [读取buffer转为json对象](#读取buffer转为json对象)
  - [将10进制转为2进制](#将10进制转为2进制)
  - [将2进制拼一起3\*8然后分隔成4\*6](#将2进制拼一起3\*8然后分隔成4\*6)
  - [然后将2进制转成10进制](#然后将2进制转成10进制)
  - [base64码](#base64码)
  - [取到每一个base64码](#取到每一个base64码)

- [小结](#小结)

### 进制间的转换
#### 对任意进制的数进行任意进制转换
[Number.prototype.toString(radix)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)

#### 将任意进制数转换为十进制数
[parseInt(string, radix)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

#### 几道关于parseInt的面试题

说到parseInt，不得不提到一个很有意思的面试题
```js
// 会输出什么？
[1, 2, 3].map(parseInt)
// => 1, NaN, NaN
```
`map`方法第一个参数为函数，函数有三个参数，`array.map((item, index, array) => { ... })`

实际上相当于
```js
function fn (item, index) {
  return parseInt(item, index)
}
[1, 2, 3].map(fn)
// parseInt迭代过程相当于如下
// parseInt(1, 0) => 1
// parseInt(2, 1) => NaN
// parseInt(3, 2) => NaN
```

再来看一个类似的面试题
```js
// 会输出什么？
'1 2 3'.replace(/\d/g, parseInt)
// => 1, NaN, 3
```
`replace`方法第二个参数若是一个函数，函数会有若干个参数。第一个为匹配模式的字符串；第二个为与模式中子表达式匹配的字符串，可以有零个或多个这样的参数。

实际上相当于如下
```js
function fn (...args) {
  // 只会取前两个参数
  return parseInt(args[0], args[1])
}
'1 2 3'.replace(/\d/g, fn)
// parseInt迭代过程相当于如下
// parseInt('1', 0) => 1
// parseInt('2', 2) => NaN
// parseInt('3', 4) => 3
```

其实在`mdn`中对`parseInt/map/replace`已经讲解的很详细，期望大家在工作之余不要太过浮躁，别做伸手党，静下心来啃一下文档并多做实践，很多面试题自然会迎刃而解。

### 编码发展历史

#### ASCII

#### GBK2312

#### GBK

#### GB18030/DBCS

#### Unicode

#### UTF-8

现在的标准，有如下特点

- UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式
- UTF-8就是每次以8个位为单位传输数据
- 而UTF-16就是每次 16 个位
- UTF-8 最大的一个特点，就是它是一种变长的编码方式
- Unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节
- UTF-8 是 Unicode 的实现方式之一

### base64编码

#### 为什么需要base64

在开发时，经常会有一些小图标图片，每一个图片都会有一次HTTP请求，由于**浏览器对同一个域名的并发数量有限制**，所以我们应该尽可能减少HTTP请求个数。

本文主要讲解编码相关，那就只讲解从编码入手如何去减少HTTP请求。

在计算机内部，任何信息最终都是使用一系列二进制存储，图片也不例外。

而且在`img`标签的`src`属性后跟上一个`base64`字符，如果该字符有效，那么会正常显示图片。

### 如何实现base64

以下涉及的所有代码均在[仓库](./encoding/2.case.js)中，感兴趣的可以自取。

#### 读取buffer转为json对象

首先准备一个`2.txt`文件。
```
冯兰兰啊我说今晚月色这么美，你说是的。
```
case.js代码
```js
const fs = require('mz/fs')
const path = require('path')

// 读取成buffer对象
async function read2JSON () {
   let ret = await fs.readFile(path.resolve(__dirname, '2.txt'))
   console.log(ret.toJSON())
   return ret.toJSON()
}
read2JSON()
// => { type: 'Buffer', data: [ 229, 134, 175, 229... ] }
```

上面的依赖[mz/fs](https://github.com/normalize/mz)已经将`fs`都包装成`promise`，所以我们能写的更像同步。

`readFile`函数如果第二个参数没有指定会读取成一个`buffer`流，是由一个个`16进制`数组合在一起的。

[buffer.toJSON](http://www.runoob.com/nodejs/nodejs-buffer.html)可以将一个buffer流转为一个json对象，十六进制也会被转十2进制。如上输出所示。

#### 将10进制转为2进制

十进制转为二进制可以通过`Number.toString(2)`方法

```js
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
data2b()
// => [ '11100101', '10000110', '10101111', '11100101'...]
```

#### 将2进制拼一起3\*8然后分隔成4\*6

一个汉字在`UTF-8`规范中由三个字节组成，一个字节由`8`个二进制物理位构成。所以一个汉字实际占用内存`3*8`，`base64`中我们实际需要`6`个物理位表示一个字节即`2**6`，所以做重新分割`4*6`。

```js
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
split()
// => [ '111001', '011000', '011010', '101111'...]
```

#### 然后将2进制转成10进制

二进制转为十进制可以通过`parseInt(string, 2)`方法

```js
async function data20 () {
  let data = await split()
  let ret = data.map(item => {
    return parseInt(item, 2)
  })
  console.log(ret)
  return ret
}
data20()
// => [ 57, 24, 26, 47, 57, 24, 22, 48, 57, 24, 22, 48 ]
```

#### base64码

`base64`中的`64`实际上是根据`2**6`所来，表示则由`大写字母、小写字母、数字、+/`构成。

```js
const lowerCases = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const base64lib = `${lowerCases.toUpperCase()}${lowerCases}${numbers}+/`
console.log(base64lib)
// => ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
```

#### 取到每一个base64码

然后我们则可以取到每一个`base64`码

```js
async function main () {
  let data = await data20()
  let ret = []
  data.forEach(item => {
    ret.push(base64lib[item])
  })
  console.log(ret.join(''))
  return ret.join()
}

main()
// => 5Yav5YWw5YWw5ZWK5oiR6K+05LuK5pma5pyI6Imy6L+Z5LmI576O77yM5L2g6K+05piv55qE44CC
```

我们可以前往[base64在线转码解码](http://base64.us/)进行验证。

![](./assets/encoding-base64-decode.png)

### 小结

如上我们可以实现将中文转为base64，同理我们也可以转换图片。
```js
async function read2JSON () {
  // let ret = await fs.readFile(path.resolve(__dirname, '2.txt'))
  // 读取图片
  let ret = await fs.readFile(path.resolve(__dirname, '../assets/nvm-ls.png'))
  console.log(ret.toJSON())
  return ret.toJSON()
}
```

**特别的：** 由于[将2进制拼一起3\*8然后分隔成4\*6](#将2进制拼一起3\*8然后分隔成4\*6)，原来存储一个汉字需要三个字节，现在需要四个字节存储，所以转换为`base64`后会比之前大`3/1`。



## 异步发展流程

异步的前世今生

### promise 解决异步编程

- setTimeout
- onClick
- ajax

### 如何解决异步问题

- 回调函数
- promise
- generator 恶心
- aync+await

### 回调函数的使用场景

- after 函数在调用几次后才会执行
- 服务端 Node 单线程异步的 非阻塞I/O
  - 存在的问题
    - 异步没法捕获错误
    - 异步编程中，可能存在回调地狱
    - 多个异步操作，在同一个时间内，如何同步异步的结果？
      - 依赖after来实现异步操作
      - 通过发布订阅模式来实现

### 为什么要用promise

- 回调地狱 如果多个异步请求 有连带关系 回调嵌套
- 多个异步实现并发的话 会出现无法同步异步的返回结果
- 错误处理不方便

### promise用法

- 不跟你多BB

### 手摸手带你撸一个promise

- 需要符合promise/A+规范
  - promise需要三个状态
  - 异步的解决
    - setTimeout
  - 链式调用的实现
    - 核心方法处理
      - 多种情况
  - 如何判断你的promise是否符合规范
    - deferred方法
    - promises-aplus-tests

- promise周边
  - catch
  - 静态方法
  - finally方法
  - all方法
    - 利用计数的思想
  - race方法

### generator用法

- 生成器生成就是迭代器，迭代器是一个函数
  - 实现一个迭代器
  - [redux-saga](https://redux-saga-in-chinese.js.org/)
  - 语法
    - 简单应用
    - yield的返回值
    - co 解决异步问题

Todo...
### async-await

- 更优雅

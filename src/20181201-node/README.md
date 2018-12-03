## Node 基础

### 目录

- 为什么学习Node

- 事件环

  - 浏览器事件环
    - 图解原理
    - 应用-面试题

  - Node事件环
    - 图解原理
    - 应用-面试题

- 模块化
  - 为什么会有模块化
    - 防止代码重名 变量污染全局
    - 太长，使用不爽
  - 怎么实现模块化的思路
    - 闭包
  - 以前的废弃了 AMD、CMD
  - 现代使用Node：CommonJs、es6：esModule
    - CommonJs：node主用
      - 如何自己撸一个
    - esModule
      - 待完善

### Node能够解决什么问题

- Java是多线程语言，在处理高并发上存在一定短板；Node是单线程的，可以很好的处理这个问题。

- 说到线程，那么再讲下进程和线程的概念以及区别。

#### 什么是进程

当一个程序开始运行时，它就是一个进程，进程包括运行中的程序和程序所使用到的内存和系统资源。

而一个进程又是由多个线程所组成的。

#### 什么是线程

线程是程序中的一个执行流，每个线程都有自己的专有寄存器(栈指针、程序计数器等)，但代码区是共享的，即不同的线程可以执行同样的函数。

#### 什么是多线程

多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

##### 多线程的优势：

可以提高CPU的利用率。在多线程程序中，一个线程必须等待的时候，CPU可以运行其它的线程而不是等待，
这样就大大提高了程序的效率。 

##### 多线程的劣势：

- 线程也是程序，所以线程需要占用内存，线程越多占用内存也越多； 
- 多线程需要协调和管理，所以需要CPU时间跟踪线程； 
- 线程之间对共享资源的访问会相互影响，必须解决竞用共享资源的问题；
- 线程太多会导致控制太复杂，最终可能造成很多Bug；

#### 什么是单线程

顾名思义，一个程序中只有一个线程，任何操作都基于此线程，那么就存在一个阻塞问题。

#### 同步和异步

同步和异步关注的是消息通知机制

- 同步就是发出调用后，没有得到结果之前，该调用不返回，一旦调用返回，就得到返回值了。 简而言之就是调用者主动等待这个调用的结果
- 而异步则相反，调用者在发出调用后这个调用就直接返回了，所以没有返回结果。换句话说当一个异步过程调用发出后，调用者不会立刻得到结果，而是调用发出后，被调用者通过状态、通知或回调函数处理这个调用。

#### 同步异步/阻塞非阻塞

上面是书本上比较枯燥的概念，下面举一个生活中的例子便于理解同步异步和阻塞非阻塞的关系。

现在有一个场景，一个男生当面向一个女生表白。在程序中男生对应着客户端即调用者，女生对应着服务端即被调用者。

男生向女生表白后可能发生如下几种情况：

- 女生说你等着我一会给你答复。这个等着的过程对于女生（被调用者）来说是同步的，但是对于男生（调用者）来说就是阻塞的。
- 女生说你先回去干别的事儿，我思考两天再给你答复。这两天对于女生（被调用者）来说是异步的，对于男生（调用者）来说也就是非阻塞的，他可以在此期间再向别的女生表白或干别的事儿，等女生想好了再通知他。

上面说到同步阻塞、异步非阻塞，当然还有另外两种情况（同步非阻塞、异步阻塞），我们在此暂不讨论。

#### Node是什么

在Node中写了一个[libuv](https://github.com/libuv/libuv)库，采用了异步非阻塞的思想，底层实际上使用了多线程来实现的。

Node使用了事件驱动、非阻塞式I/O的模型，使其轻量又高效

Node能火起来最大的一个原因在于包管理器`npm`，它是全球最大的开源库生态系统。

#### Node使用场景

- 现在各个公司都在主推的**前后端分离**中，使用Node做中间层。
  - 前后端分离，那就必然存在跨域问题，使用Node做一层接口封装，这个过程不会跨域，Node也在前端控制，对于前端也不会跨越。即解决跨域问题。
  - 当然还能通过`Nginx`解决跨域问题。引入Node也主要是为了让后端职责更专注于逻辑处理，对于一些数据转换完全可以交由前端处理，使得职责更加分明。

- 当应用程序需要处理高并发场景时，多线程语言中如Java会耗费大量内存，是并不推荐的。
  - 聊天服务器：大量并发的输入输出
  - 电子商务网站：无过复杂逻辑，大量并发的输出（大量用户同一时间浏览网站）

### 事件循环机制

先了解下任务队列

- 所有同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，还存在一个任务队列。只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- 主线程不断重复上面的第三步。


此时区分为**浏览器的事件循环**和**Node端的事件循环**。下面将一一详解。

### 浏览器的事件循环

主线程从任务队列中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop(事件循环)

![eventloop-browser](./assets/eventloop-browser.png)

上图过程是一个宏观的表述，实际上`callback queue`任务队列是分为`macro task`宏任务和`micro task`微任务两种。

在一个事件循环当中，执行的步骤与如下：

1. 首先将同步代码放入执行栈进行执行，若存在异步事件则将其的返回结果会被放到一个任务队列中。任务队列又分为宏任务队列和微任务队列。
2. 当执行栈为空时，会优先查看微任务队列中是否有事件存在
  - 若存在，则依次执行队列事件中的对应回调，直到微任务队列为空，再进入下一步
  - 若不存在，跳往下一步
3. 查看宏任务队列中是否有事件存在
  - 若存在，则将队列中的事件的对应回调放入执行栈执行
  - 若不存在，跳往下一步
4. 若执行栈中又有异步代码，则放入下一个任务队列。如此反复循环前三个步骤

从以上我们得知重点是执行栈为空后优先处理微任务再处理宏任务。

#### 浏览器中的宏任务和微任务有哪些

写过vue的同学应该熟悉一个方法`this.$nextTick(() => { ... })`，此时对于宏任务和微任务的分类我们不知所措，那就看看vue源码中是如何处理的。

[next-tick.js传送门](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js)

其中定义的很清楚

- 宏任务
  - setImmediate
  - MessageChannel
  - setTimeout

- 微任务
  - promise的then方法
  - MutationObserver (vue2.0已经废弃使用此API)

**setImmediate/setTimeout**

setImmediate为IE特有的，我们可以在IE浏览器环境下做测试
```js
setImmediate(() => {
  console.log('setImmediate')
})
setTimeout(() => {
  console.log('setTimeout')
}, 0) // 延迟设置为0，实际上是会有4ms的延迟。
// => setImmediate
//    setTimeout
```
[例子代码地址](./event-loop/1.setImmediate.html)

**MessageChannel**

H5的API，兼容性不怎么好，[前往mdn](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/MessageChannel)查看使用

再做如下测试
```js
let channel = new MessageChannel()
let port1 = channel.port1
let port2 = channel.port2
port1.postMessage('hello careteen ~')
port2.onmessage = function (e) {
  console.log(e.data)
}
// => hello careteen ~
```
[例子代码地址](./event-loop/2.MessageChannel.html)

**promise的then方法**
```js
Promise.resolve(100).then(data => {
  console.log(data)
})
// => 100
```

**MutationObserver**
这也是一个属于微任务的异步方法，前往[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)查看使用

此方法在vue1.0中有使用到，但是再2.0以后则废弃了。

下面简单介绍下使用，场景为为页面创建多个节点，当节点创建完成后告诉我们。

html
```html
<div id="box"></div>
```
js
```js
let observer = new MutationObserver(function() {
  console.log('dom 更新完了')
  console.log(box.children.length)
})
// 监听后代的变化
observer.observe(box, {
  childList: true
})
for (let i = 0; i < 5; i++) {
  box.appendChild(document.createElement('sapn'))
}
for (let i = 0; i < 10; i++) {
  box.appendChild(document.createElement('p'))
}

// => 当节点创建完成后
//    dom 更新完了
//    15
```
[例子代码地址](./event-loop/3.MutationObserver.html)

### Node的事件循环

![eventloop-node](./assets/eventloop-node.png)

- V8引擎解析JavaScript脚本。
- 解析后的代码，调用Node API。
- libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
- V8引擎再将结果返回给用户。

以上也只是宏观上的一个描述，和浏览器一样，异步事件方法的队列也细分了几个。前往[Node官网](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)可查看详细说明

下面摘自Node官网
```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```
- timers阶段
  - `setTimeout`方法
  - `setInterval`方法
- pending callbacks阶段
  - I/O读写操作。如`fs.readFile()`方法
- idle, prepare阶段
  - 仅在内部使用，我们暂时不用关注
- poll阶段
  - 检索新的I/O事件，执行与I/O相关的回调(除了关闭回调、计时器调度的回调和setimmediation()之外，几乎所有回调都是如此);节点将在适当的时候在这里阻塞。
- check阶段
  - `setImmediate()`的回调会在这个阶段执行
- close callbacks阶段
  - 例如`socket.on('close', ...)`这种close事件的回调


#### Node中的宏任务和微任务有哪些
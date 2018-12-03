## 事件循环详解

Node系列-上一节[为什么要使用Node](./node.md)

### 目录

- [事件循环机制](#事件循环机制)
- [浏览器的事件循环](#浏览器的事件循环)
  - [浏览器中的宏任务和微任务有哪些](#浏览器中的宏任务和微任务有哪些)
    - setImmediate/setTimeout
    - MessageChannel
    - promise的then方法
    - MutationObserver
  - [面试题详解](#面试题详解)

- [Node的事件循环](#Node的事件循环)
  - [面试题详解](#面试题详解)

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

在一个事件循环当中，执行的步骤如下：

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

#### 面试题详解

case1:
```js
Promise.resolve().then(() => {
  console.log('then1')
  setTimeout(() => {
    console.log('timer1')
  }, 0)
})
console.log('start')
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(() => {
    console.log('then2')
  })
}, 0)
// => start -> then1 -> timer2 -> then2 -> timer1
```
[例子代码地址](./event-loop/5.browser.case1.js)

根据上面的执行流程可得知结果。
- 先执行同步代码`start`，
- promise的then方法里面放进微任务队列，
  - 然后执行同步代码`then1`
  - 将setTimeout放入宏任务队列
- setTimeout的回调放入宏任务队列
- 等到setTimeout2时间到了
  - 执行setTimeout2回调的同步代码`timer2`
  - promise的then方法里面放进微任务队列，然后执行`then2`
  - 等到setTimeout1的时间到了，执行里面同步代码

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
从上面的模型中我们可以得知机制的执行顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...

细分的几个异步队列：
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


和浏览器的事件循环机制有所不同：

- 首先会在`poll`阶段
  - 先查看`poll queue`中是否有事件
    - 若有，则按先进先出的顺序依次执行回调
    - 若无，则会检查是否有`setImmediate`的回调
      - 若有此回调，则会进入下面`check`阶段去执行这些回调
    - 于此同时，检查是否有到期的`timer`
      - 若有，则将这些到期的`timer`的回调按照调用顺序放到`timer queue`，然后循环进入`timer`阶段执行队列中的回调
    - `setImmediate`和`timer`的判断顺序不是固定的，受代码运行环境的影响
    - 如果`setImmediate`和`timer`的队列都是空的，那么循环会在`poll`阶段停留，直到有一个I/O事件返回，循环会进入`I/O callback`阶段并立即执行这个事件的回调
- `check`阶段
  - 此阶段专门执行`setImmediate`的回调，当`poll`阶段进入空闲状态，并且`setImmediate`队列中有callback时，事件循环进入这个阶段
- `close`阶段
  - 当一个socket连接或者一个handle被突然关闭时（例如调用了`socket.destroy()`方法），close事件会被发送到这个阶段执行回调。否则事件会用`process.nextTick()`方法发送出去
- `timer`阶段
  - 这个阶段以先进先出的方式执行所有到期的timer加入timer队列里的callback，一个timer callback指得是一个通过setTimeout或者setInterval函数设置的回调函数
- `I/O callback`阶段
  - 如上文所言，这个阶段主要执行大部分I/O事件的回调，包括一些为操作系统执行的回调。例如一个TCP连接生错误时，系统需要执行回调来获得这个错误的报告。
- 如此反复循环

- 特别的：`process.nextTick()`这个方法虽然没有在上面列入，但是却在每个阶段执行完毕准备进入下一个阶段时优先调用
  - 与执行`poll queue`的任务不同的是，这个操作在队列清空前是不会停止的。也就是说错误使用会导致node进入一个死循环，直到内存泄露

#### 面试题详解

上面说了一大推，看起来很枯燥，那么下面来几个case深入理解

case1:
```js
Promise.resolve().then(() => {
  console.log('then1')
  setTimeout(() => {
    console.log('timer1')
  }, 0)
})
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(() => {
    console.log('then2')
  })
}, 0)
// => then1 -> timer2 -> then2 -> timer1
// or then1 -> timer2 -> timer1 -> then2
```
[例子代码地址](./event-loop/4.node.case1.js)

上面代码的结果有两种可能，`then2`执行后，`timer1`可能还没到时间也可能到时间了，因为`setTimeout`方法第二个参数如果设置为`0`，实际执行时会有`4ms`的延迟。

case2:
```js
setTimeout(() => {
  console.log('timeout')
}, 0)
setImmediate(() => {
  console.log('setImmediate')
})
// => setImmediate -> timeout
// or timeout -> setImmediate
```
[例子代码地址](./event-loop/4.node.case1.js)

多运行几次，运行结果是不一定的，这取决于运行代码的环境。运行和环境中的各种复杂情况会导致在同步队列里两个方法的顺序随机决定。

再来看一个例子case3:
```js
let fs = require('fs')
fs.readFile('1.setImmediate.html', () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('setImmediate')
  })
})
// => setImmediate -> timeout
```
[例子代码地址](./event-loop/4.node.case1.js)

回顾上面提到的阶段，在`I/O事件`的回调中，`setImmediate`的回调永远优先于`setTimeout`的回调执行。所以返回结果的顺序是固定的。


Node系列-下一节[手摸手带你撸一个commonjs规范](./module.md)
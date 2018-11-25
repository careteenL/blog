## 异步发展流程

**本文主要探讨下异步的前世今生**

由于JavaScript单线程的特性，我们需要异步编程解决阻塞问题。

### 异步编程问题

我们每天的工作中都可能会用到以下函数做一些异步操作

- setTimeout
- onClick
- ajax

### 如何解决异步问题

解决异步问题现有的方式如下

- 回调函数
- promise
- generator 恶心
- aync+await

下面将逐一介绍各种方式如何解决异步问题，涉及代码已放入[仓库]()

### 回调函数

首先介绍一下高阶函数，即一个函数的参数是函数或者函数返回值为函数，此函数称做高阶函数。

#### lodash-after函数

再来看一个例子，常使用lodash的同学应该熟悉的一个方法[_.after(n, fn)](https://www.css88.com/doc/lodash/#_aftern-func)，作用是fn函数在调用n次以后才会执行。
```js
let fn = after(3, () => {
  console.log('该执行了')
})
fn()
fn()
fn() // => 该执行了
```

那如何实现一个`after`函数呢，其实主要是利用**闭包和计数**的思想：
```js
const after = (times = 1, cb = _defaultCb) => {
  return function () {
    if (--times === 0) {
      cb()
    }
  }
}

const _defaultCb = () => {}
```

其中`cb`作为函数参数传入`after`函数，即是高阶函数的一个应用。

[例子地址](./callback/1.after.js)

#### Node读取文件

在[./static](./callback/static/)下新建了两个文件`name.txt`,`age.txt`，期望读取文件内容并赋值给一个对象，然后打印。
```js
const fs = require('fs')

let schoolInfo = {}

fs.readFile('./static/name.txt', 'utf8', (err,data) => {
  schoolInfo['name'] = data
})
fs.readFile('./static/age.txt', 'utf8', (err, data) => {
  schoolInfo['age'] = data
})
console.log(schoolInfo) // {}
```
由于读取文件的过程是异步的，所以通过这种方式是无法满足预期的。

并且异步操作存在以下三个问题

- 1、异步没法捕获错误
- 2、异步编程中，可能存在回调地狱
- 3、多个异步操作，在同一时间内，如何同步异步的结果？

回调地狱大家已经非常熟悉了。
```js
const fs = require('fs')

let schoolInfo = {}
fs.readFile('./static/name.txt', 'utf8', (err,data) => {
  schoolInfo['name'] = data
  fs.readFile('./static/age.txt', 'utf8', (err, data) => {
    schoolInfo['age'] = data
  })  
})
```
并且两个文件读取时间是累加，不是并行的，如果文件很多并且很大，那等待时间将非常久，所以并不推荐。

这里针对第三个问题**多个异步操作，在同一时间内，如何同步异步的结果？**，可以采用**发布订阅**的方式解决
```js
// 一个简易的方法订阅对象
let dep = {
  arr: [],
  emit () {
    this.arr.forEach((fn) => {
      fn()
    })
  },
  on (fn) {
    this.arr.push(fn)
  }
}
```
不了解发布订阅模式的请移步我的[另一篇博客]()

通过以下操作即可达到预期
```js
let schoolInfo = {}
const fs = require('fs')

// 一个简易的方法订阅对象
let dep = {
  arr: [],
  emit () {
    this.arr.forEach((fn) => {
      fn()
    })
  },
  on (fn) {
    this.arr.push(fn)
  }
}

// 订阅
dep.on(() => {
  // 只有读取了两个文件的内容并赋值以后才会打印
  if (Object.keys(schoolInfo).length === 2){
    console.log(schoolInfo)
  }
})

// 读取触发
fs.readFile('./static/name.txt', 'utf8', (err, data) => {
  schoolInfo['name'] = data
  dep.emit()
})
fs.readFile('./static/age.txt', 'utf8', (err, data) => {
  schoolInfo['age'] = data
  dep.emit()
})
```
在每次读取文件时触发打印事件，事件中进行判断只有两次读取都完成的情况下才会打印。

以上方法看似解决了上面提到的第三个问题**多个异步操作，在同一时间内，同步异步的结果**，但是随着需求的变动，需要再读取一个`address`文件，就需作如下变动：
```js
...
// 订阅
dep.on(() => {
  // 只有读取了两个文件的内容并赋值以后才会打印
  if (Object.keys(schoolInfo).length === 3){ // 2改为3
    console.log(schoolInfo)
  }
})
...
// 新增一项adress
fs.readFile('./static/adress.txt', 'utf8', (err, data) => {
  schoolInfo['adress'] = data 
  dep.emit()
})
```
再新增多项的话，代码的扩展性就非常差了。

### 为什么要用promise

那么接下来介绍promise的出现所解决的问题

- 回调地狱，如果多个异步请求，有连带关系，回调嵌套
- 多个异步实现并发的话，会出现无法同步异步的返回结果
- 错误处理不方便

### promise用法

- 不跟你多BB

### 手摸手带你撸一个promise

首先需要提到[promise/A+规范](https://promisesaplus.com/)，我们自己编写的promise是需要一个标准的。可以根据此标准一步一步来。

#### 需要三个状态

```js
const PENDING = 'pending' // 等待态
const FULFILLED = 'fulfilled' // 成功态
const REJECTED = 'rejected' // 失败态
```
- 当状态为`pending`时
  - 可能转换为`fulfilled`或`rejected`
- 当状态为`fulfilled`或`rejected`时
  - 不能转为其他状态
  - 必须有一个`value`或`reason`且不能改变

#### then方法

更详细请移步文档，这里说几个重点

- 处理`executor`函数中代码异常的情况
- 处理`executor`函数中代码为异步的情况
- 处理then的多次调用
- 处理then的链式调用

**处理`executor`函数中代码异常的情况**

对`executor`try-catch即可
```js
class Promise {
  constructor(executor) {
    let self = this
    self.status = PENDING
    self.value = undefined
    self.reason = undefined    

    const resolve = (value) => {
      if(self.status === PENDING){
        self.value = value
        self.status = FULFILLED
      }      
    }

    const reject = (reason) => {
      if(self.status === PENDING){
        self.reason = reason
        self.status = REJECTED
      }      
    }

    try{
      executor(resolve, reject) // 如果执行这个executor执行时候抛出异常 应该走下一个then的失败
    }catch(e){
      reject(e)// 出错了 reason就是错误
    }    
  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED){
      onFulfilled(this.value)
    }
    if (this.status === REJECTED){
      onRejected(this.reason)
    }    
  }
}
```
如下使用
```js
let Promise = require('./3.1.promise.js')

let p = new Promise((resolve,reject) => {
  resolve('xx')
})

p.then((data) => {
  console.log('p success',data)
}, (err) => {
  console.log(err)
})
```
虽然实现了一个很简易的promise，但还存在很多问题，比如下面
```js
let Promise = require('./3.1.promise.js')
let p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

p2.then((data) => {
  console.log('p2 success',data)
}, (err) => {
  console.log(err)
})
```
对于异步的代码是不会处理的

**处理`executor`函数中代码为异步的情况**

使用发布订阅模式的思想处理
```js
class Promise {
  constructor(executor) {
    let self = this
    self.status = PENDING
    self.value = undefined
    self.reason = undefined
    self.onResolvedCallbacks = [] // 新增 一个数组存放成功处理
    self.onRejectedCallbacks = [] // 新增 一个数组存放失败处理

    const resolve = (value) => {
      if(self.status === PENDING){
        self.value = value
        self.status = FULFILLED
        self.onResolvedCallbacks.forEach((fn) => { // 新增 触发时遍历所有
          fn()
        })     
      }      
    }

    const reject = (reason) => {
      if(self.status === PENDING){
        self.reason = reason
        self.status = REJECTED
        self.onRejectedCallbacks.forEach((fn) => { // 新增 触发时遍历所有
          fn()
        })        
      }      
    }

    try{
      executor(resolve, reject) // 如果执行这个executor执行时候抛出异常 应该走下一个then的失败
    }catch(e){
      reject(e)// 出错了 reason就是错误
    }    
  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED){
      onFulfilled(this.value)
    }
    if (this.status === REJECTED){
      onRejected(this.reason)
    }    
    if( this.status === PENDING){ // 新增 处理异步
      // 默认当前 new Promise  executor中是有异步的
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }    
  }
}

```
使用
```js
let Promise = require('./3.2.promise.js')

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

p.then((data) => {
  console.log('p success',data)
}, (err) => {
  console.log(err)
})

p.then((data) => {
  console.log('p second success',data)
}, (err) => {
  console.log(err)
})
```

**处理then的链式调用**

和`jQuery`的链式调用一个套路，不过在这儿需要返回一个新的`promise`而不是当前，因为成功态和失败态是不能转为其他状态的
```js
class Promise {
  constructor(executor) {
    let self = this
    self.status = PENDING
    self.value = undefined
    self.reason = undefined
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []  

    const resolve = (value) => {
      if(self.status === PENDING){
        self.value = value
        self.status = FULFILLED
        self.onResolvedCallbacks.forEach((fn) => {
          fn()
        })     
      }      
    }

    const reject = (reason) => {
      if(self.status === PENDING){
        self.reason = reason
        self.status = REJECTED
        self.onRejectedCallbacks.forEach((fn) => {
          fn()
        })        
      }      
    }

    try{
      executor(resolve, reject) // 如果执行这个executor执行时候抛出异常 应该走下一个then的失败
    }catch(e){
      reject(e)// 出错了 reason就是错误
    }    
  }

  then (onFulfilled, onRejected) {
    let self = this
    let promise2 // 这个promise2 就是我们每次调用then后返回的新的promise
    // 实现链式调用主要的靠的就是这个promise
    promise2 = new Promise((resolve, reject) => {
      if (self.status === FULFILLED) {
        setTimeout(() => {
          try {
            // 这个返回值是成功函数的执行结果
            let x = onFulfilled(self.value)
            // 判断promise2 和 x 也是then函数返回的结果和promise2的关系 如果x 是普通值 那就让promise2成功 如果 是一个失败的promise那就让promise2 失败
            self._resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (self.status === REJECTED) {
        setTimeout(() => {
          try {
            // 这个返回值是失败函数的执行结果
            let x = onRejected(self.reason)
            // 判断promise2 和 x 也是then函数返回的结果和promise2的关系 如果x 是普通值 那就让promise2成功 如果 是一个失败的promise那就让promise2 失败
            self._resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }   
      
      if (self.status === PENDING) {
        // 默认当前 new Promise  executor中是有异步的
        self.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(self.value)
              self._resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)          
        });
        self.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(self.reason)
              self._resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)          
        })
      }       
    })
    return promise2
  }

  // 内部核心方法 处理 成功或者失败执行的返回值 和promise2的关系
  _resolvePromise (promise2, x, resolve, reject) {
    // 这个处理函数 需要处理的逻辑韩式很复杂的
    // 有可能这个x 是一个promise  但是这个promise并不是我自己的
    resolve(x) // 目前只做一个简单处理
  }
}
```
使用
```js
let Promise = require('./3.3.promise.js')

let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})

// promise 中 每次调用then 都应该返回一个新的promise 
// promise的实例只能成功或者失败  不能既成功又失败
p.then((data) => {
  console.log('p success', data)
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log('success then', data)
}, (err) => {
  console.log(err)
})
```
如代码中只是简单处理`_resolvePromise`方法

**完善_resolvePromise**

再移步规范文档[处理_resolvePromise](https://promisesaplus.com/#the-promise-resolution-procedure)

需要考虑以下几种情况

`_resolvePromise (promise2, x, resolve, reject)`

- x为一个普通值
- x为promise2时会导致循环调用
- x为一个对象或者函数
  - x为一个promise

考虑以上进行完善
```js
  // 内部核心方法 处理 成功或者失败执行的返回值 和promise2的关系
  _resolvePromise (promise2, x, resolve, reject) {
    // 这个处理函数 需要处理的逻辑韩式很复杂的
    // 有可能这个x 是一个promise  但是这个promise并不是我自己的
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise '))
    }
    // 不单单需要考虑自己 还要考虑 有可能是别人的promise
    let called // 文档要求 一旦成功了 不能调用失败
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
      // 这样只能说 x 可能是一个promise
      try {
        // x = {then:function(){}}
        let then = x.then // 取then方法
        if (typeof then === 'function') {
          then.call(x, y => { // resolve(new Promise)
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject) //  递归检查promise
          }, reason => {
            if (called) return
            called = true
            reject(reason)
          })
        } else { // then方法不存在
          resolve(x); // 普通值
        }
      } catch (e) { // 如果取then方法出错了，就走失败
        if (called) return
        called = true
        reject(e)
      }
    } else { // 普通值
      resolve(x)
    }
  }
```
使用
```js
let Promise = require('./3.4.promise.js')

// 普通返回值
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})
p.then((data) => {
  console.log(`p success ${data}`)
  return 'first result'
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p success then ${data}`)
}, (err) => {
  console.log(`p error ${err}`)
})

// 抛错
let p2 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p2 xxx')
  }, 1000)
})
p2.then((data) => {
  throw new Error('just happy')
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p2 success then ${data}`)
}, (err) => {
  console.log(`p2 error ${err}`)
})

// promise
let p3 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('p3 xxx')
  }, 1000)
})
p3.then((data) => {
  return new Promise((resolve, reject) => {
    resolve('p3 data')
  }).then(data => {
    return data
  })
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(`p3 success then ${data}`)
}, (err) => {
  console.log(`p3 error ${err}`)
})

// 循环引用 - 例子待改
let p4 = new Promise((resolve,reject) => {
  let circleP = new Promise((resolve, reject) => {
    resolve(circleP)
  })  
  return circleP
})
p4.then((data) => {
  console.log(data)
})
```
以上一个符合`Promise/A+`规范的promise基本完成

那怎么验证自己写的promise是否正确呢？

追加以下`deferred`方法以供检查
```js
// 基于Promise实现Deferred 也提供给`promises-aplus-tests`做检查
static deferred () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd    
}
```

安装检查工具`promises-aplus-tests`
```shell
npm i -g promises-aplus-tests
```

执行检查
```shell
promises-aplus-tests your-promise.js
```
都是绿色表示检查通过

[代码地址]()

### promise周边

以上只是一个简易的promise，我们期望完善更多功能：

- catch方法
- 静态方法
- finally方法
- all方法
- race方法

#### catch方法

实现
```js
// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
catch (onRejected) {
  return this.then(null, onRejected)
}
```
使用
```js
let Promise = require('./3.6.promise.js')

// catch
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})
p.then((data) => {
  console.log(`p success then ${data}`)
}).then((data) => {
  throw new Error('just happy')
}).catch(err => {
  console.log(`p ${err}`)
})
// => p success then xxx
//    p Error: just happy
```

#### 静态方法

实现
```js
static resolve (value) {
  return new Promise(resolve => {
    resolve(value)
  })
}

static reject (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
```
使用
```js
let Promise = require('./3.6.promise.js')

// static resolve reject
let p2 = Promise.resolve(100)
p2.then(data => {
  console.log(`p2 ${data}`)
})
let p3 = Promise.reject(999)
p3.then(data => {
  console.log(`p3 ${data}`)
}).catch(err => {
  console.log(`p3 err ${err}`)
})
// => p2 100
//    p3 err 999
```

#### finally方法

实现
```js
// finally 也是then的一个简写
finally (cb) {
  // 无论成功还是失败 都要执行cb 并且把成功或者失败的值向下传递
  return this.then(data => {
    cb()
    return data
  }, err => {
    cb()
    throw err
  })
}
```
使用
```js
let Promise = require('./3.6.promise.js')

// finally
let p4 = Promise.resolve(100)
p4.then(data => {
  throw new Error('error p4')
}).finally(data => {
  console.log(`p4 ahhh`)
}).catch(err => {
  console.log(`p4 err ${err}`)
})
// => p4 ahhh
//    p4 err Error: error p4
```

#### all方法

实现
```js
/**
 * @desc 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 * @param {Array<Promise>} promises promise对象组成的数组作为参数
 * @return 返回一个Promise实例
 */
static all (promises) {
  return new Promise((resolve, reject) => {
    let arr = []
    // 处理数据的方法
    let i = 0
    const processData = (index, data) => {
      arr[index] = data //数组的索引和长度的关系
      if (++i === promises.length){ // 当数组的长度 和promise的个数相等时 说明所有的promise都执行完成了
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++){
      let promise = promises[i]
      if (typeof promise.then == 'function'){
        promise.then(function (data) {
          processData(i, data) // 把索引和数据 对应起来 方便使用
        }, reject)
      }else{
          processData(i,promise)
      }
    }
  })    
}
```
使用
```js
let Promise = require('./3.6.promise.js')

// all & race
const fs = require('fs')
const path = require('path')
const resolvePath = (file) => {
  return path.resolve(__dirname, '../callback/static/', file)
}
const read = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath(file), 'utf8', (err, data) => {
      if(err) reject(err)
      resolve(data)
    })    
  })
}
// all
Promise.all([
  read('name.txt'),
  read('age.txt')
]).then(data => {
  console.log(`all ${data}`)
}).catch(err => {
  console.log(`all err ${err}`)
})
// => all Careteen,23
```

#### race方法

实现
```js
/**
 * @desc 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 * @param {Array<Promise>} promises 接收 promise对象组成的数组作为参数
 * @return 返回一个Promise实例
 */
static race (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(resolve, reject)
    })
  })    
}
```
使用
```js
let Promise = require('./3.6.promise.js')

// all & race
const fs = require('fs')
const path = require('path')
const resolvePath = (file) => {
  return path.resolve(__dirname, '../callback/static/', file)
}
const read = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath(file), 'utf8', (err, data) => {
      if(err) reject(err)
      resolve(data)
    })    
  })
}
// race
Promise.race([
  read('name.txt'),
  read('age.txt')  
]).then(data => {
  console.log(`race ${data}`)
}).catch(err => {
  console.log(`race err ${err}`)
})
// => race Careteen/23 不一定 得看读取速度
```

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

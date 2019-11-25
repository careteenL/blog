/**
 * 简易版1.1.1
 * @param {Function} executor 
 */ 
// 1.promise需要有三个状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    } 
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
        })
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
          resolve(x) // 普通值
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

  // 基于Promise实现Deferred 也提供给`promises-aplus-tests`做检查
  static deferred () {
    let dfd = {}
    dfd.promise = new Promise((resolve,reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd    
  }

  // 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
  catch (onRejected) {
    return this.then(null, onRejected)
  }

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

  /**
   * @desc 不管状态如何都会执行
   * @param {Function} callback
   * @return {Promise} 会保留上一个then的状态
   */
  // finally(callback) {
  //   return this.then(
  //     value => Promise.resolve(callback()).then(() => value),
  //     reason => Promise.resolve(callback().then(() => {throw reason}))
  //   )
  // }

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

}

module.exports = Promise

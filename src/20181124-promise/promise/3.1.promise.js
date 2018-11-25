/**
 * 简易版1.0.0
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

module.exports = Promise

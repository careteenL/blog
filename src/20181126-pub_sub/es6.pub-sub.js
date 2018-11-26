// 工具函数：是否为函数
let isFunction = function (obj) {
  return typeof obj == 'function' || false
}

class EventEmitter {
  // Map 存放不同事件对应的观察者的处理函数
  constructor () {
    this.listeners = new Map()
  }
  // 绑定事件
  on (label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }
  // 移除事件
  off( label, callback) {
    let listenerArr = this.listeners.get(label)
    let targetIndex
    if (listenerArr && listenerArr.length) {
      targetIndex = listenerArr.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback) ? i = index : i
      }, -1)
    }
    if (targetIndex > -1) {
      listenerArr.splice(targetIndex, 1)
      this.listeners.set(label, listenerArr)
      return true
    }
    return false
  }
  // 触发事件
  emit (label, ...args) {
    let listenerArr = this.listeners.get(label)
    if (listenerArr && listenerArr.length) {
      listenerArr.forEach((listener) => {
        listener(...args)
      })
      return true
    }
    return false
  }
}

class Observer {
  // subject 保存订阅对象
  constructor(id, subject) {
    this.id = id
    this.subject = subject
  }
  on(label, callback) {
    this.subject.on(label,callback)
  }
}
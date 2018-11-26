let publisher = new EventEmitter()

// 实例两个观察者
let [observer1, observer2] = [
  new Observer(1, publisher),
  new Observer(2, publisher)
]
// 绑定事件
observer1.on('careteen', (data) => {
  console.log(`${observer1.id} observered data:`, data)
})
observer2.on('lanlan', (data) => {
  console.log(`${observer2.id} observered data:`, data)
})
// 触发事件
publisher.emit('careteen', {x: 'yaoxiugai'}) // 1 observered data: {x: 'yaoxiugai'}
publisher.emit('lanlan', [1, 2, 3]) // 2 observered data: [1, 2, 3]
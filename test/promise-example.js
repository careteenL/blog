let p = new Promise(resolve => {
  resolve(1)
  Promise.resolve().then(_ => console.log(2))
  console.log(4)
}).then(t => console.log(t))
console.log(3)

// 4 -> 3 -> 2 -> 1

const p1 = new Promise(resolve => {
  setTimeout(_ => {
    resolve(1)
  }, 1000)
})
const p2 = new Promise(resolve => {
  setTimeout(_ => {
    resolve(2)
  }, 2000)
})
const p3 = new Promise(resolve => {
  setTimeout(_ => {
    resolve(3)
  }, 3000)
})
console.time('promise')
Promise.all([p3, p2, p1]).then(res => {
  console.log(res)
  console.timeEnd('promise')
})

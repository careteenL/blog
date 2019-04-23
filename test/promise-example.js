let p = new Promise(resolve => {
  resolve(1)
  Promise.resolve().then(_ => console.log(2))
  console.log(4)
}).then(t => console.log(t))
console.log(3)

// 4 -> 3 -> 2 -> 1
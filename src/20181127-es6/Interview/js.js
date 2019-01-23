/**
 * let和箭头函数的运用
 */
let b = 200
let obj = {
  b: 100,
  a: () => {
    setTimeout(_ => {
      console.log(this.b)
    }, 0)
  }
}
obj.a()
// => undefined

/**
 * 变量提升的运用
 */
console.log(a)
var a = 100
fn('zhangsan')
function fn(name) {
  age = 20
  console.log(name, age)
  var age
}
console.log(b)
b = 100;
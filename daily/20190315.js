Array.prototype.multiply = function () {
  return this.concat(this.map(item => item * item))
}

let a = [1, 2, 3, 4, 5]
let ret = a.multiply()
console.log(ret)

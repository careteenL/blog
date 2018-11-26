/**
 * @desc yield的返回值
 */ 
function * say() {
    let a = yield 'hello'
    console.log('a', a)
    let b = yield 'careteen'
    console.log('b', b)
    let c = yield 'lanlan'
    console.log(c)
}
let it = say()
it.next(100) // 第一次next传递参数 是无意义的
it.next(200)
it.next(300)
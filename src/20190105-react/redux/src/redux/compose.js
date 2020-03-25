function add1(str) {
    return '1' + str;
}
function add2(str) {
    return '2' + str;
}
function add3(str) {
    return '3' + str;
}
/* function compose(add3, add2, add1) {
    return function (str) {
        return add3(add2(add1(str)));
    }
} */

export default function compose(...fns) {
    //return fns.reduce((a, b) => (...args) => a(b(...args)));
    return fns.reduce((a, b) => function (...args) {
        return a(b(...args));
    });
}
/**
 * 第一次执行的时候
 * add3=>a add2=>b   (args)=> add3(add2(args))
 * (args)=> add3(add2(args))=>a add1=>b  (args)=>add3(add2(add1(args))
 */
let composedFn = compose(add3, add2, add1);
let result = composedFn('Careteen');//321Careteen
console.log(result);


let arr = [1, 2, 3];
Array.prototype.reduce2 = function (fn, initialState) {
    let result = initialState;
    for (let i = 0; i < this.length; i++) {
        result = fn(result, this[i]);
    }
    return result;
}
let result2 = arr.reduce2((a, b) => a + b, 0);
console.log(result2);
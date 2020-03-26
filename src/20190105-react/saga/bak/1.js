function* gen() {
    let a = yield 1;
    console.log('a', a);
    let b = yield 2;
    console.log('b', b);
    let c = yield 3;
    console.log('c', c);
    console.log('over');
}
let it = gen();
let result1 = it.next();
console.log('result1', result1);//{value:1,done:false}
result2 = it.next('a');
console.log('result2', result2);//{value:2,done:false}
result3 = it.next('b');
console.log('result3', result3);//{value:3,done:false}
result4 = it.next('c');
console.log('result4', result4);//{value:undefined,done:true}


function* task1() {
    console.log(1);
    yield 1;
    console.log(1);
}
function* task2() {
    console.log(2);
    yield 2;
    console.log(2);
}
function* gen() {
    yield task1();
    yield task2();
}
let it = gen();
let result = it.next();
console.log(result);
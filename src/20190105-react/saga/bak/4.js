function* gen() {
    while (true) {
        yield 1;
    }
}
let it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
//events EventEmitter
//take once
//takeEVery on addEventListener
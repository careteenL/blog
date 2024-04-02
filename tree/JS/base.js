/**
 * @desc call apply bind
 */
// 将function 的 this 指向 context，并将 args 传给 context
Function.prototype.myCall = function(context, ...args) {
  const fn = Symbol();
  context[fn] = this;
  const ret = context[fn](...args);
  delete context[fn];
  return ret;
};

function A(name, age) {
  this.name = name;
  this.age = age;
}

function B(name, age, city) {
  // A.call(this, name, age);
  A.myCall(this, name, age);
  this.city = city;
}

console.log(new B("careteen", 28, "Zunyi").name);

/**
 * @desc bind 实现
 * @knowledge 柯里化 create this
 */
// Function.prototype.bind = function(context = global, ...outerArgs) {
//   const _this = this;
//   return function(...innerArgs) {
//     return _this.apply(context, [...outerArgs, ...innerArgs]);
//   };
// };

// function sum(...args) {
//   return this.prefix + args.reduce((memo, cur) => memo + cur, 0);
// }
// const bindSum = sum.bind({ prefix: "$" }, 1, 2, 3);
// console.log(bindSum(4, 5));

Function.prototype.bind = function(context = global, ...outerArgs) {
  const thatFunc = this;
  Object.create = function(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
  function fBound(...innerArgs) {
    return thatFunc.apply(this instanceof thatFunc ? this : context, [
      ...outerArgs,
      ...innerArgs,
    ]);
  }
  // fBound.prototype = thatFunc.prototype; // 不直接复制的原因是不能污染 thatFunc 的原型
  fBound.prototype = Object.create(thatFunc.prototype);
  return fBound;
};
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return `${this.x},${this.y}`;
};
const YAxis = Point.bind(null, 1);
const axis = new YAxis(2);
console.log(axis.toString());
console.log(axis instanceof Point);
console.log(axis instanceof YAxis);

/**
 * @desc 实现访问对象里属性的值
 */
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, "a"); // = 1;
let r2 = parse(obj, "b.c"); // = 2;
let r3 = parse(obj, "d[2]"); // = 3;
let r4 = parse(obj, "e.0.f[1]"); // = 4;
console.log(r1, r2, r3, r4);

function parse(obj, str) {
  const attr = str.replace(/\[(\d+)\]/g, ".$1").split(".");
  let ret = obj;
  attr.forEach((item) => {
    ret = ret[item];
  });
  return ret;
}

function parse(obj, str) {
  return new Function("obj", "return obj." + str.replace(/\.(\d+)/g, "[$1]"))(
    obj
  );
}

/**
 * @desc 数组扁平化
 */
let arr = [[1], [2, 3], [4, 5, 6, [7, 8, [9, 10, [11]]]], 12];
Array.prototype.myFlat = function(depth = 1) {
  const result = [];
  function _flat(array, _depth = 0) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (Array.isArray(element)) {
        if (_depth <= depth) {
          _depth = _depth + 1;
          _flat(element, _depth);
        } else {
          result.push(element);
        }
      } else {
        result.push(element);
      }
    }
  }
  _flat(this);
  return result;
};
console.log(arr.myFlat(3));
console.log(arr.flat(Infinity));
function myFlat(list) {
  while (list.some((item) => Array.isArray(item))) {
    list = [].concat(...list);
  }
  return list;
}
console.log(myFlat(arr));

/**
 * @desc 不可变对象，本质是修改属性的 descriptor
 * 不可扩展：不可增
 * 密封: 不可增删
 * 冻结: 不可增删改
 */
Object.preventExtensions({});
Object.seal({});
Object.freeze({});
Object.defineProperty({}, "a", {
  writable: true,
  configurable: true,
  enumerable: true,
});

/**
 * @desc 柯里化
 * @knowledge 函数柯里化就是把接受多个传参的函数变换成接受一个单一参数的函数，并且返回接受剩余参数返回结果的技术
 */
function add(...args) {
  var _add = add.bind(null, ...args);
  _add.toString = function() {
    return args.reduce((memo, cur) => memo + cur, 0);
  };
  return _add;
}
function curry(fn, ...args) {
  return args.length < fn.length
    ? (...extraArgs) => curry(fn, ...args, ...extraArgs)
    : fn(...args);
}
function addFn(a, b, c, d, e) {
  return a + b + c + d + e;
}
let add = curry(addFn);
console.log(add(1, 2, 3, 4, 5)); //15
console.log(add(1)(2, 3)(4, 5)); //15
console.log(add(1)(2)(3)(4)(5)); //15

/**
 * @desc 使 a == 1 && a == 2 && a == 3 成立
 * @knowledge Proxy Symbol.toPrimitive
 */
// method 1
let a = new Proxy(
  {},
  {
    i: 1,
    get() {
      return () => this.i++;
    },
  }
);
if (a == 1 && a == 2 && a == 3) {
  console.log("flag is true");
}
// method 2 需要形成闭包 保留 i 的值
let aa = {
  [Symbol.toPrimitive]: (function(hint) {
    let i = 1;
    return () => i++;
  })(),
};
if (aa == 1 && aa == 2 && aa == 3) {
  console.log("flag is true");
}

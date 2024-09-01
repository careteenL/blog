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

/**
 * @desc 实现 Promise.all 方法，当所有 promise 都成功才会resolve，如果有一个失败就 reject
 */
function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = []; // 存放所有结果
    const completed = 0; // 当前完成的数量
    function resolveData(res, i) {
      result[i] = res;
      completed++;
      if (completed >= promises.length) {
        resolve(result);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      // 需要判断每一项是否是 promise，如果不是，就直接返回
      if (typeof promise.then === "function") {
        promise.then((res) => {
          resolveData(res, i);
        }, reject);
      } else {
        resolveData(res, i);
      }
    }
  });
}

/**
 * @desc 如何取消一个 promise 不返回结果
 */
function cancelPromise(promise, token) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      token.cancel = () => {
        reject(new Error("cancel"));
      };
    }),
  ]).catch((error) => {
    console.log("error: ", error);
  });
}

const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});
const token = {};
cancelPromise(fetchData, token).then((res) => {
  console.log("res: ", res);
});

// 在某个时刻取消 promise
setTimeout(() => {
  token.cancel();
}, 400);

/**
 * @desc 实现 co 遍历 generator
 */
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      const { value, done } = it.next(data);
      if (done) {
        resolve(value);
      } else {
        value.then((res) => {
          next(res);
        }, reject);
      }
    }
    next();
  });
}

function read(params = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params);
    }, 200);
  });
}

function* r() {
  const r1 = yield read("1");
  const r2 = yield read(`${r1}_2`);
  const r3 = yield read(`${r2}_3`);
  return r3;
}
co(r()).then((res) => {
  console.log("res: ", res);
});

/**
 * @desc 发布订阅，支持先订阅后发布、先发布后订阅
 * 类似于关注微信公众号，历史文章也能看到
 * 多维护一个缓存 map，当发布的时候都往里面放，若有订阅的时候判断 map 是否有值，有就直接执行，就能实现先发布后订阅
 */
class EventEmitter {
  // 缓存所有发布
  cached = {};
  // 订阅 map
  handlers = {};
  // 订阅
  on(type, callback) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push(callback);
    // 订阅时如果有发布，则执行订阅函数
    if (this.cached[type]) {
      this.cached[type].forEach((item) => {
        callback(...item);
      });
    }
  }
  // 发布
  emit(type, ...args) {
    const callbacks = this.handlers[type];
    if (callbacks && callbacks.length) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
    if (!this.cached[type]) {
      this.cached[type] = [];
    }
    // 每次发布都缓存发布的传参，以便订阅时使用
    this.cached[type].push(args);
  }
}

const eventEmitter = new EventEmitter();
// 先订阅后发布
eventEmitter.on("click", (res) => {
  console.log("click: ", res);
});
eventEmitter.on("click", (res) => {
  console.log("click1: ", res);
});
eventEmitter.emit("click", 1);
// 先发布后订阅
eventEmitter.emit("tap", 1);
eventEmitter.on("tap", (res) => {
  console.log("tap: ", res);
});
eventEmitter.on("tap", (res) => {
  console.log("tap1: ", res);
});

/**
 * @des 跨域的解决方案
 * - 前端和后端通信
 *  - jsonp
 *  - cors 后端或者 nginx 配置
 *  - http-proxy-middleware node 中间件
 *  - websocket
 * - iframe间通信
 *  - postMessage
 *  - location.hash
 *  - window.name
 *  - document.domain 同一主域不同子域
 */
/**
 * @desc 实现 jsonp
 */
function jsonp({ url, jsonp, data }) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const queryStr = url.indexOf("?") === -1 ? "?" : "&";
    for (const key in data) {
      queryStr += `${key}=${data[key]}&`;
    }
    const callbackName = `JQuery_${Date.now()}`;
    window[callbackName] = function(response) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(response);
    };
    script.src = `${url}${queryStr}${jsonp}=${callbackName}`;
    document.body.appendChild(script);
  });
}

// 在某个地方调用并处理返回结果
jsonp({
  url: "",
  jsonp: "cb",
  data: {},
}).then((res) => {
  console.log("res: ", res);
});
// nodejs 服务端代码示例
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.type("text/javascript");
  res.send(`${req.query.cb}(${JSON.stringify({ a: 1 })})`);
});
app.listen(3000, () => {
  console.log("start server");
});

# 常考题目

## 目录

- let和箭头函数的运用
- 


## let和箭头函数的运用

看下面题目会输出什么？
```js
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
// 结果 undefined
```
箭头函数里面是没有`this`的，`this.b`的this为父上下文的this，全局即等价于`window.b`

又因为`let`所定义的变量不会挂载到`window`，所以打印为`undefined`

如果对上面进行变形
```js
var b = 200
let obj = {
  b: 100,
  a: () => {
    setTimeout(_ => {
      console.log(this.b)
    }, 0)
  }
}
obj.a()
// 结果 200
```
因为`var`定义的变量会挂载到`window`，所以输出`200`

[更详细使用及讲解](https://www.cnblogs.com/var-chu/p/8476464.html)

## 变量提升的运用

[JavaScript作用域和闭包](https://www.cnblogs.com/chengzp/p/scopechain.html)

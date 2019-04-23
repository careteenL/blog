# JS知识

- todo：使用doctoc生成目录

## 原始类型有哪几种？null是对象吗？基本数据类型和引用类型在存储上的差别？

- 原始类型有`Undefined、Null、Boolean、number、string、object、symbol`七种，ES6新增了`symbol`类型。
- `null`是一个关键字并非对象，它的语义表示空值。
- 基本数据类型和引用类型在`存储`上的区别是：
  - 基本数据类型存储在`栈`中，因为这些基本类型占据的空间是固定的，所以将其存入较小的内存区域栈中，便于快速查询变量的值。比如`var a = 10; var b = a; b = 20; console.log(a)`，此时的打印结果是`10`，因为`var b = a`只是将`a`的值复制了一份，去更改`b`的值并不会影响`a`。
  - 引用数据类型存储在`堆`中，也就是说，在栈中存储在变量处的值是一个指向堆内存的一个引用地址。比如`var obj1 = new Object(); var obj2 = obj1; obj2.name = 'careteen'; console.log(obj1.name)`，此时的打印结果是`careteen`，因为`var obj2 = obj1`将`obj1`的引用地址复制了一份，当更改其中一个变量的值时，都是操作的同一块推内存空间，另一个也会更新。

## 说一下JS中类型转换的规则？

- 存在的意义：由于JavaScript是一门弱类型语言，类型转换是非常频繁的。
- 转换规则
  - 先上一张图
   ![tree-type_transform](../../assets/tree-type_transform.jpg)
  - 基本类型之间转换
    - 将`null`,`undefined`,`true/false`,`number`转换为`boolean,number,string`规则较为简单，如上图所示。
  - StringToNumber
    - `string`转换为`number`会稍微复杂一点。转为`number`类型提供了`parseInt/parseFloat`两个函数，也可以用`Number`基本对象类型进行转换。
    - `parseInt`函数提供两个参数，第二个参数是第一个参数的进制数，如果不传会存在一些兼容性问题，在不同浏览器表现不一致，所以在工作中使用到了此函数，都约定好了传第二个参数。
    - 还是强烈建议使用`Number`进行转换。避免可能存在的问题发生。
  - NumberToString
    - 不那么重要吧
  - 装箱转换
    - 也就是将基本类型转为对象类型。其实每一种基本类型在对象中都有对应的类（Number...）。
  - 拆箱转换
    - 也就是将对象类型转换为基本类型。其中存在一些隐式规则。会尝试调用对象的`valueOf`和`toString`方法进行转换。
      - 比如所求表达式的结果看起来像一个`Number`类型，那么会先调用`valueOf`再调用`toString`去尝试转换
      - 比如所求表达式的结果看起来像一个`String`类型，那么会先调用`toString`再调用`valueOf`去尝试转换

- 参考[winter重学前端](https://time.geekbang.org/column/article/78884?utm_term=zeusRWKG3&utm_source=app&utm_medium=zhuanti)

## == 和 === 区别，什么情况用 == ？

## 为什么 0.1+0.2 != 0.3 ？

## 深拷贝和浅拷贝的区别？如何实现？

## new 的原理是什么？通过 new 的方式创建的对象和通过字面量创建有什么区别？

## 如何正确判断 this ？箭头函数的 this 是什么？

## 什么是闭包？

## 如何理解原型？如何理解原型链？

## 什么是变量提升？

## typeof 和 instanceof 的区别？

## call、apply及bind函数内部实现是怎么样的？

## 说一下你对JavaScript执行上下文栈和作用域的理解？

## 为什么会出现setTimeout倒计时误差？

- todo 题目待完善。
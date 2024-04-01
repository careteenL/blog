# React 生态

## 目录

- [Basic](#Basic)
- [Router](#Router)
- [Redux](#Redux)
- [Connected](#Connected)
- [Hooks](#Hooks)
- [Saga](#Saga)
- [dva](#dva)
- [umi](#umi)

## Basic

[使用文档](./base)

## Router

[使用文档](./router)

## Redux

[使用文档](./redux/src)

### redux

[实现](./redux/src/redux)

### react-redux

[实现](./redux/src/react-redux)

## Connected

[使用及实现](./connected-react-router)

## Hooks

为什么需要 hooks

- 想在函数式组件中使用 state 等

类组件存在几个缺点

- 性能差。因为是是类，有实例，需要保存在内存中，但函数式组件用完直接销毁。
- 高阶组件复用性差。
- 生命周期就像是黑盒子，管理起来麻烦。

hooks 顺序非常重要，不能在 if/for 中使用。因为 hooks 内部实现为了能多个使用，使用链表实现，如果用了 if 顺序可能会混乱。

> 使用链表的好处：更适合插入操作(时间复杂度为 O(1))，但数组插入的平均复杂度为 O(n)。

### useState

内部其实也是根据`useReducer`实现的。

### useReducer

感觉可取代 redux

### useEffect

替代类组件中**didMount/willUpdate/willUnMount**这些生命周期里写一些副作用的功能（定时器、操作 dom、订阅）

## Saga

[使用文档](./saga)

## dva

[使用文档](./dva/src/index.js)

## umi

`umi-request`和`fetch/axios`的对比

umi 封装的很 nice 啊。`缓存/错误处理/前缀/后缀/中间件`。一定要看源码实现。

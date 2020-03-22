# react

## 目录

- 基础使用
- hooks
- 路由
- redux
- dva
- umi

## 基础使用

[使用文档](./doc)

## hooks

为什么需要hooks
- 想在函数式组件中使用state等

类组件存在几个缺点
- 性能差。因为是是类，有实例，需要保存在内存中，但函数式组件用完直接销毁。
- 高阶组件复用性差。
- 生命周期就像是黑盒子，管理起来麻烦。

hooks顺序非常重要，不能在if/for中使用。因为hooks内部实现为了能多个使用，使用链表实现，如果用了if顺序可能会混乱。
> 使用链表的好处：更适合插入操作(时间复杂度为O(1))，但数组插入的平均复杂度为O(n)。

### useState

内部其实也是根据`useReducer`实现的。

### useReducer

感觉可取代redux

### useEffect

替代类组件中**didMount/willUpdate/willUnMount**这些生命周期里写一些副作用的功能（定时器、操作dom、订阅）

## umi

`umi-request`和`fetch/axios`的对比

umi封装的很nice啊。`缓存/错误处理/前缀/后缀/中间件`。一定要看源码实现。
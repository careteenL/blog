# React相关知识

- todo：使用doctoc生成目录

## setState

## 父子、兄弟组件间如何通信？

## 如何实现redux？

## useMemo和useCallback的区别
两者传参一样（cb, [a, b]），目的都是当第二个参数依赖项改变时才重新计算cb值，
- `useMemo`返回的是cb的执行结果
- `useCallback`返回的是cb本身
- `useCallback(fn, deps)`相当于`useMemo(() => fn, deps)`
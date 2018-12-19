# 手摸手带你实现一个Http-Server命令行工具

## 目录

- 前置知识
- 初始化项目

## 初始化项目

首先初始化项目
```shell
npm init -y
```

新建一个`bin`目录并在其下新建`www.js`文件
```js
#! /usr/bin/env node
console.log('careteen')
```

然后在`package.json`中新增如下信息
```json
  "bin": {
    "@careteen-http-server": "./bin/www.js",
    "@careteen-hs": "./bin/www.js"
  },
```

再在当前项目将当前项目下的`bin`指令关联到全局
```shell
npm link
```

现在我们可以在任何地方执行
```shell
@careteen-http-server
# or
@careteen-hs
```
在控制台中可以看到我们打印的信息
![](./assets/)

## 
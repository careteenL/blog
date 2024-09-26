# 场景

- 复盘大文件下载优化方案？
  - service worker 是什么？使用场景？ant-design-pro 项目的作用是什么？
    - web-worker 线程的一种；缓存策略，配合 pwa 的使用
    - 可以拦截页面的请求，提供多种缓存使用策略（缓存优先、网络优先、速度优先、使用缓存的同时请求网络更新数据）
  - 大文件分片下载方案实现？ https://blog.csdn.net/ygxyvip/article/details/133820942
  - streamsaver 作用？前端如何使用？
  - 使用多线程 webworker 解决页面切换定时器停止问题？ https://blog.csdn.net/amyliyanice/article/details/126358842
  - umi-request 的 signal 字段可以暂停资源的下载？
    - umi-request 基于 fetch
    - signal 的实现类似于 axios 的 cancel
  - localforage
    - 类似于 localstorage 的异步方案
    - 优先使用 indexedDb -> websql -> localstorage
- 优化打包时间

  - 参考内容 pnpm https://juejin.cn/post/7131903244434931748
  - pnpm 为什么快？基于内容寻址的算法怎么实现？
    - 基于三层
    - 第一层：当前项目的 node_modules
    - 第二层：当前项目的 .pnpm 解决幽灵依赖的问题
    - 第三层：全局的 pnpm-store 解决跨项目复用的问题
    - 第一层会软链接到第二层
    - 第二层硬链接到第三层
    - 第三层基于内容寻址而非基于文件名寻址，因为 npm 包内容固定的特性，版本更新时一般只是多个文件的改变，可以把文件都转成 hash，然后 diff 也转成 hash，进行存储和寻找；
  - npm yarn pnpm bun 的优势和发展历程？
    - npm@2 依赖嵌套
    - npm@3 依赖铺平，会产生幽灵依赖问题
  - 幽灵依赖问题的解决？
  - monorepo 概念和使用场景？
  - lerna 语法如何获取到当前修改了哪些具体包？
    - lerna-changed
  - lint-stage 如何做的？
    - 参考 https://juejin.cn/post/7412931320067735593
    - 实现原理主要是借助 git diff --cached --name-only 找到本次只修改了哪些文件名

- 网络、性能优化、性能监控

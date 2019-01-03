# webpack基础使用与优化

## 目录

- 打包前清空输出目录
- 拷贝静态文件
- 添加商标
  - 公司项目一般不需要加
- 服务器代理的几种方式
  - 不修改路径
  - 修改路径
  - before after
  - node服务启动webpack
    - 主要使用webpack-dev-middleware
- 区分环境变量
- 配置全局常量
- resolve解析
- 优化
  - 自带的优化项
    - tree-shaking
  - 内置了插件但需要手动编码
    - noParse
    - IgnorePlugin
    - Happypack
  - 第三方插件
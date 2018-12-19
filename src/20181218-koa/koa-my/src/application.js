const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
const Stream = require('stream')
const Emitter = require('events')

class Koa extends Emitter{
  constructor () {
    super()
    // Object.create 切断原型链
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    // 存放中间件数组
    this.middlewares = []
  }

  /**
   * 使用中间件
   */ 
  use (fn) {
    this.middlewares.push(fn)
  }

  /**
   * 创建上下文
   * 封装 request response
   * @param {*} req 
   * @param {*} res 
   */ 
  createContext (req, res) {
    let ctx = this.context
    // 请求
    ctx.request = this.request
    ctx.req = ctx.request.req = req
    // 响应
    ctx.response = this.response
    ctx.res = ctx.response.res = res
    return ctx
  }

  /**
   * 组合中间件
   * @param {*} middlewares 
   * @param {*} ctx 
   */ 
  compose (middlewares, ctx) {
    function dispatch (index) {
      // 迭代终止条件 取完中间件
      // 然后返回成功的promise
      if (index === middlewares.length) return Promise.resolve()
      let middleware = middlewares[index]
      // 让第一个函数执行完，如果有异步的话，需要看看有没有await
      // 必须返回一个promise
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
    }
    return dispatch(0)
  }

  /**
   * 处理用户请求
   * @param {*} req 
   * @param {*} res 
   */ 
  handleRequest (req, res) {
    let ctx = this.createContext(req, res)
    res.statusCode = 404
    let ret = this.compose(this.middlewares, ctx)
    ret.then(_ => {
      if (!ctx.body) { // 没设置body
        res.end(`Not Found`)
      } else if (ctx.body instanceof Stream) { // 流
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        ctx.body.pipe(res)
      } else if (typeof ctx.body === 'object') { // 对象
        res.setHeader('Content-Type', 'text/josn;charset=utf-8')
        res.end(JSON.stringify(ctx.body))
      } else { // 字符串
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(ctx.body)
      }
    }).catch(err => { // 处理程序异常
      this.emit('error', err)
    })
    return ctx
  }

  /**
   * 启动服务
   * @param {*} args 
   */ 
  listen (...args) {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

module.exports = Koa

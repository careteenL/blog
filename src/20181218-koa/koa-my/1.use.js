const Koa = require('koa')

let app = new Koa()

app.use((ctx, next) => {
  console.log(ctx)
  console.log('native req ----') // node原生的req
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)
  console.log('koa request ----') // koa封装了request
  console.log(ctx.url)
  console.log(ctx.request.url)
  
  // 封装后相当于
  // ctx = {}
  // ctx.request = {}
  // ctx.response = {}
  // ctx.req = ctx.request.req = req
  // ctx.res = ctx.response.res = res
  // ctx.url 代理了 ctx.request.url
})

app.listen(4000)
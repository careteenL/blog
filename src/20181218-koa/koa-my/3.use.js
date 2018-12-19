const fs = require('fs')
const path = require('path')
const Koa = require('./src/index')

let app = new Koa()

const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log('logger')
      resolve()
    }, 1000)
  })
}

app.use(async (ctx, next) => {
  console.log(1)
  console.log(ctx.path)
  // 字符
  // ctx.body = '冯兰兰啊，我说今晚月光这么美，你说是的'
  // 对象
  // ctx.body = {name: 'Careteen', gf: 'Lanlan'}
  // 流
  ctx.body = fs.createReadStream(path.join(__dirname, '3.use.html'))
  await next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await logger()
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})

app.on('error', err => {
  console.log(err)
})

app.listen(4000)
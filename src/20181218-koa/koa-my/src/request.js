/**
 * 基于原生 req 封装
 * 使用ES5提供的属性访问器实现
 */ 
const url = require('url')

let request = {
   
  get url () {
    return this.req.url
  },

  get path () {
    let { pathname } = url.parse(this.req.url)
    return pathname
  },

  get query () {
    let { query } = url.parse(this.req.url, true)
    return query
  }
}

module.exports = request

/**
 * 基于原生 res 封装
 */ 
let response = {
  set body (val) {
    this.res.statusCode = 200 // 设置过body就认为成功 这里还需扩展
    this._body = val
  },
  get body () {
    return this._body
  }
}

module.exports = response

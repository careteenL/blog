# XSS-CSRF

## XSS

### XSS概念

XSS（Cross Site Scripting）：跨域脚本攻击。

### XSS攻击原理

XSS攻击的核心原理是：不需要你做任何的登录认证，它会通过合法的操作（比如在url中输入、在评论框中输入），向你的页面注入脚本（可能是js、hmtl代码块等）。

最后导致的结果可能是：

盗用Cookie破坏页面的正常结构，插入广告等恶意内容D-doss攻击

### XSS攻击方式

#### 反射型

发出请求时，XSS代码出现在url中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS代码。这个过程像一次反射，所以叫反射型XSS。

#### 存储型

## 引用

- [浅说 XSS 和 CSRF](https://github.com/dwqs/blog/issues/68)



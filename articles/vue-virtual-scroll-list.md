# 如何渲染几万条数据并不卡住界面

## 目录

- [背景](#背景)
- [粗暴实现](#粗暴实现)
- [分片实现](#分片实现)
- [虚拟滚动列表形式](#虚拟滚动列表形式)

## 背景

现在项目中列表页都会做成分页的形式，但是仍然存在一些场景：后端返回所有数据（可能成千上万条），前端渲染。

## 粗暴实现
页面结构
```html
<ul>控件</ul>
```
逻辑功能
```js
// 插入十万条数据
const total = 100000
let ul = document.querySelector("ul")
console.time('loopTime')
function add() {
  // 优化性能，插入不会造成回流
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < total; i++) {
    const li = document.createElement("li")
    li.innerText = Math.floor(Math.random() * total)
    fragment.appendChild(li)
  }
  ul.appendChild(fragment)
}
add()
console.timeEnd('loopTime')
```
通过`console.timeEnd('loopTime')`获取代码执行时间。
![loopTime]()
在上图中我们发现log很快打印，且只有几百毫秒；但是左上角却一直在loading，并没有完成渲染。所以此写法并不能统计到页面的渲染时间。

此时我们需要回顾下浏览器端的事件环机制。
![eventLoop]()
从上图中我们得知当`JS引擎线程`中含有宏or微任务时，会分别入各自队列，当执行栈代码执行完成后，会首先清空微任务队列，然后触发一次`GUI渲染`（记住这个时机），再取出一个宏任务执行；若微任务中含有微任务，会将其入队列，注意其中包含的微任务会在这次一起清空，如果含有宏任务，加入宏任务队列；以此反复循环。

> 如果还不是很了解，可前往[面试必问之事件循环详解](https://github.com/careteenL/blog/issues/2)。

从上面我们可得知，在清空微任务队列后，会触发一次`GUI渲染`，所以此时我们可以在代码中加一个`setTimeout`即可。
```js
// 插入十万条数据
const total = 100000
let ul = document.querySelector("ul")
console.time('loopTime')
console.time('loopAndRenderTime') // ++
function add() {
  // 优化性能，插入不会造成回流
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < total; i++) {
    const li = document.createElement("li")
    li.innerText = Math.floor(Math.random() * total)
    fragment.appendChild(li)
  }
  ul.appendChild(fragment)
}
add()
console.timeEnd('loopTime')
setTimeout(_ => { // ++
  console.timeEnd('loopAndRenderTime') // ++
}) // ++
```
此时能获取到js循环执行的时间加➕页面渲染的时间为大约`5s`。但当数据量很大时，页面白屏时间会特别长，用户早关闭了网站，所以此时需要优化。

## 分片实现

实现思路为：每几十毫秒渲染20个。这个间隔时间可以使用`requestAnimationFrame`。
```js
setTimeout(() => {
  // 插入十万条数据
  const total = 100000
  // 一次插入 20 条，如果觉得性能不好就减少
  const once = 20
  // 渲染数据总共需要几次
  const loopCount = total / once
  let countOfRender = 0
  let ul = document.querySelector("ul");
  function add() {
    // 优化性能，插入不会造成回流
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if (countOfRender < loopCount) { // 递归终止条件
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0);
```
![zoneRender]()
可看出页面几乎没有白屏，在向下滚动页面时能看到滚动条会向上滚，这是因为递归过程在生成新的节点。

这种解决方法虽然在视觉上解决了白屏的问题，但是仍然存在`页面节点数庞大`的问题，当节点过于庞大时页面也会卡顿，所以还需要继续优化。

## 虚拟滚动列表形式

大致思路：

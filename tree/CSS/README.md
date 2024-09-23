## CSS 基础知识

- [圣杯布局](./grail-layout.html)
- [双飞翼布局](./double-wing-layout.html)
- [BFC 详解](./bfc.md)

- flex 布局

  - 子项设置 order 实现排序
  - 子项设置 flex-grow 定义比重

- grid 布局

  - 指定某个项具备整体的多少份
    - `grid-template-rows: repeat(4, 1fr)` fraction
  - 指定某个项在网格的具体位置和占用原子数
    - `grid-row: x1/y3; grid-column: x2/y4;` 坐标点（左上、右下）
    - `area: x1/x2/y2/y4`

- ant-design 的 row、col 使用 flex 模拟实现 grid 的二维

  - [参考资料](https://juejin.cn/post/6981402951168294943)
  - row 需要将 gutter 通过 context 透传给 col，row 设置为 flex 布局
  - column 根据 span 去设置 `flex: 0 0 percentage($span / $grid-columns);`,然后设置 padding left 和 right 为 gutter 的一半

- 移动端适配方案

  - 百分比
  - em
  - rem
  - vw、vh
  - rpx

- 数据大屏方案
  - vw、vh
    - 用法：使用插件对 px 转成 vw
    - 优点：
    - 缺点：
  - rem + vw/vh
    - 用法： 在根元素上使用 vw 来设置 font-size，然后子元素都使用 rem
    - 优点：
    - 缺点：
  - transform scale
    - 用法： 根据设计稿分辨率的宽高比，以及当前设备的宽高比，来对大屏的根元素设置 `transform: scale(deviceWidth / baseWidth, deviceHeight / baseHeight)`
    - 优点： 代码量少，可复用性高，只处理大屏根元素即可；
    - 缺点： 当设备的宽高比和设计稿不一致时，会出现两边留白情况；对于 canvas 的图表，鼠标热区会偏移；
    - 使用场景： 对于 canvas 多、地图多、交互多的场景，应该用 rem+vw 的方式更好
  - 我们的场景：
    - 数据大屏+数据实时变更+ echarts 图表（饼图、柱状图、折线图）+hover 交互；
    - 采用 scale+echarts svg 模式

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

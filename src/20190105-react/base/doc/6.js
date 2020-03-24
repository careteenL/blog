import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 复合组件
 * 如何划分组件的维度或者说粒度
 * 太大 组件太复杂，不好易维护
 * 太小太细 组件太简单，而且数量会非常的多，也难以管理和维护
 * 高内聚，低耦合
 * 功能要高度内聚，组件和组件之间尽量不要耦合
 * 什么需要拆分组件
 * 1.组件已经太复杂了，无法管理了
 * 2.组件需要被复用  
 * 
 * 1. 如何进行组件的拆分和组件
 * 2. 组件内的数据如何传递
 */
class PanelHead extends React.Component {
    render() {
        return (
            <div className="panel-heading" style={{ border: `1px solid ${this.props.color}` }}>
                我是面板的头部
            </div>
        )
    }
}
class PanelBody extends React.Component {
    render() {
        return (
            <div className="panel-body" style={{ border: `1px solid ${this.props.color}` }}>
                我是面板主体部分
            </div>
        )
    }
}
class PanelFooter extends React.Component {
    render() {
        return (
            <div className="panel-footer" style={{ border: `1px solid ${this.props.color}` }}>
                我是面板的尾部
            </div>
        )
    }
}
class Panel extends React.Component {
    render() {
        return (
            <div className="panel panel-default" style={{ border: '1px solid red' }}>
                <PanelHead color="red" />
                <PanelBody color="red" />
                <PanelFooter color="red" />
            </div>
        )
    }
}
ReactDOM.render(<panel />, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
class MouseTracker extends React.Component {
    state = {
        x: 0, y: 0
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                <span>hello</span>
                {this.props.render(this.state)}
                <span>world</span>
            </div>
        )
    }
}
//高阶组件的写法
function withMouseTracker(OldComponent) {
    return props => (
        <MouseTracker render={props => <OldComponent {...props} />} />
    )
}
let App = props => (
    <React.Fragment>
        <h1>请移动鼠标</h1>
        <p>当前鼠标的位置 x={props.x} y={props.y}</p>
    </React.Fragment>
)
let WithMouseTrackerApp = withMouseTracker(App);
ReactDOM.render(<div>
    <WithMouseTrackerApp />
</div>, document.getElementById('root'));

/**
 * 把children实现成一个函数。在组件里可以调用此函数，从而渲染函数返回虚拟DOM
 * 高阶组件和render是可以互相改写的，也可以互相转化
 */
/**
 * 高阶组件HOC和render方法他们的区别并不于谁来决定渲染出来的内容 ，渲染出来都由
 *  根本区别在于高阶组件传递的是一个函数组件 render方法传递是一个函数
 *
 *//**
* 高阶组件是把一个组件传递给了 一 个函数  一般会产生一个新组件
* render是把一个渲染的函数传递给了一个组件 一般并不会产生新组件
*
*
*/

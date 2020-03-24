import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 只有类组件才有生命周期
 */
class Counter extends React.Component {
    static defaultProps = {//0.设置默认属性
        name: 'zhufeng'
    }
    constructor(props) {
        super(props);
        this.state = { count: 0 };//1.执行构造函数，设置初始状态
        console.log('1.执行构造函数，设置初始状态');
    }
    componentWillMount() {
        console.log('2.componentWillMount 组件将要挂载到页面上');
    }
    handleClick = (event) => {
        this.setState({ count: this.state.count + 1 });
    }
    //询问组件是否需要更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log('5.shouldComponentUpdate 询问组件是否需要更新?');
        //return nextState.count % 3 == 0;
        return true;
    }
    componentWillUpdate() {
        console.log('6.componentWillUpdate 组件将要更新');
    }
    componentDidUpdate() {
        console.log('7.componentDidUpdate 组件的最新状态已经同步到界面中去了');
    }

    //render是要返回虚拟DOM
    render() {
        console.log('3.render 确定要显示虚拟DOM是什么?');
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}>+</button>
                <hr />
                {
                    this.state.count < 3 ? <ChildCounter count={this.state.count} /> : null
                }

            </div>
        )
    }
    //当此虚拟DOM已经被挂载到真实DOM中之后就会执行componentDidMount,这个时候才能获得真实DOM元素
    componentDidMount() {
        console.log('4.componentDidMount 组件挂载完成后');
    }
}
class ChildCounter extends React.Component {
    componentWillReceiveProps(newProps) {
        console.log('ChildCounter componentWillReceiveProps', newProps);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('ChildCounter 询问组件是否需要更新?');
        //return nextProps.count % 6 == 0;
        return true;
    }
    componentWillUpdate() {
        console.log('ChildCounter 组件将要更新');
    }
    componentDidUpdate() {
        console.log('ChildCounter 组件的最新状态已经同步到界面中去了');
    }
    componentWillUnmount() {
        console.log('ChildCounter 将要被销毁了');
    }
    render() {
        console.log('ChildCounter render');
        return (
            <div>{this.props.count}</div>
        )
    }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
/**
 * 父组件 子组件
 * componentWillMount 先父先子
 * componentDidMount 先父先子
 */
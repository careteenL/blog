import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 属性 父组件传过来的，自己是不能控制，也不能改变
 * 状态 状态是组件自己内部产生的维护的,由自己维护，外界无法访问。唯一改变状态 的方式就是setState
 * 
 */
class Counter extends React.Component {
    //也可以定义或者说初始化状态
    //类的构造函数 类的原型 类的实例
    //state = { number: 0 }
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        //定义状态地方，或者 给状态初始化，或者说给this.state直接赋值的地方
        //构造函数是唯一给状态赋值的地方
        this.state = { name: 'zhufeng', number: 0 };
    }
    /**
     * 合成事件  React合成事件
     * 事件代理
     * event并不是原始的dom对象，而是 react 自己二次封装的事件对象，可以实复用
     * setState
     * 异步
     * 合并
     * 当你在进行事件处理的时候，会进行批量更新状态。
     * 先缓存所有的更新，然后等事件结束之后再进行统一的更新
     * 
     */
    /**
     * 在组件类的实例中 this 是不是类的实例?
     * 一般来说类的方法里的this是undefined
     * 那如何让普通方法的this指定组件实例 
     * 1. 箭头函数
     * 2. 匿名函数 
     * 3.  bind绑定 this.add.bind(this)
     *      3.1 在render里绑定
     *      3.2 是在构造函数里绑定
     */
    add(amount) {
        //现在不推荐大家直接写值了，而是在setState里面放一个函数 参数是上一个状态，返回值是下一个状态
        /*  this.setState((previousState) => ({ number: previousState.number + 1 }), () => {
             console.log(1, this.state);
         });
         this.setState((previousState) => ({ number: previousState.number + 2 }), () => {
             console.log(2, this.state);
         });
         this.setState((previousState) => ({ number: previousState.number + 3 }), () => {
             console.log(3, this.state);
         }); */
        //在setTimeout里面如果调用setState的话，会立刻更新
        /* setTimeout(() => {
            this.setState({ number: this.state.number + 3 });
            console.log(this.state);
        }) */
        this.setState({ number: this.state.number + amount });
    }
    render() {
        //当我们调用setState方法的时候，会引起状态的改变和组件的重新刷新
        console.log('render');
        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.number}</p>
                <button onClick={() => this.add(5)}>+</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
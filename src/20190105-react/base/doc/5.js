import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 1.如何定义组件
 * 定义组件有两种方式 ，一种是函数式 一种是类的方式
 * 返回的是一个React顶级元素
 * React是如何定义，如何渲染的
 * 1. 把所有的属性组合成一个对象
 * 2. 把属性对象作为参数传递给函数组数
 * 3. 函数组件会返回一个React元素
 * 4. 然后由ReactDOM.render方法来把虚拟DOM(React元素)转为真实元素并且插到页面中
 */
/* function Welcome(props) {
    //JSX表达式只能有一个父元素
    return (
        <h1>hello {props.name}<span>world</span></h1>
    )
} */
/**
 * 1. 收集props对象
 * 2. 把props对象传递给Welcome类的构造函数 new Welcome(props),然后获取Welcome类的实例
 * 3. 调用实例上的render方法进行渲染，获得返回的React元素
 * 4. 然后把此元素渲染到页面
 */
class Welcome extends React.Component {
    constructor(props) {
        super(props);//把props对象传递给父组件Component
    }
    render() {
        return (
            <h1>
                hello {this.props.name}
                <span>world</span>
            </h1>
        )
    }
}
//let element = <Welcome name="zhufeng" />;
//createElement的第一个参数是元素的类型，可以是一个字符串，也可以是类组件，也可以是一个函数
//React是通过首字母是否是大写来区分是内置的原生DOM组件(span h1).和自定义组件(都要以大写字母开头)
//let element = React.createElement(welcome, { name: "zhufeng" });
//The tag <welcome> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
ReactDOM.render(<Welcome />, document.getElementById('root'));
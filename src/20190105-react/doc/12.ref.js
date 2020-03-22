import React from 'react';
import ReactDOM from 'react-dom';
/**
 * ref
 *  this.refs={
 *    num1:num1对应的真实DOM
 *    num2:num2对应的真实DOM 
 *    result:result对应的真实DOM
 * }
 * ref是 reference引用 ，让你可以引用一个虚拟DOM无素的真实DOM
 * 1. ref=字符串 已经将被废弃
 * 2. ref=函数   不推荐
 * 3. ref= React.createRef()结果 已经推荐 useRef
 */
/* class Calculator extends React.Component {
    add = () => {
        let num1 = parseInt(this.refs.num1.value);
        let num2 = parseInt(this.refs.num2.value);
        let result = num1 + num2;
        this.refs.result.value = result;
    }
    render() {
        return (
            <div>
                <input ref="num1" />+<input ref="num2" /><button onClick={this.add}>=</button><input ref="result" />
            </div>
        )
    }
} */
/* class Calculator extends React.Component {
    add = () => {
        let num1 = parseInt(this.num1.value);
        let num2 = parseInt(this.num2.value);
        let result = num1 + num2;
        this.result.value = result;
    }
    **
     * ref值是一个函数话，那么此函数会在虚拟DOM转成真实DOM插入页面中之后执行，参数就是此真实DOM
     *
    render() {
        return (
            <div>
                <input ref={instance => this.num1 = instance} />+<input ref={instance => this.num2 = instance} /><button onClick={this.add}>=</button><input ref={instance => this.result = instance} />
            </div>
        )
    }
} */
/* class Calculator extends React.Component {
    constructor() {
        super();
        this.num1 = React.createRef();//{current:null变成真实DOM}
        this.num2 = React.createRef();//{current:null变成真实DOM}
        this.result = React.createRef();//{current:null变成真实DOM}
    }
    add = () => {
        let num1 = parseInt(this.num1.current.value);
        let num2 = parseInt(this.num2.current.value);
        let result = num1 + num2;
        this.result.current.value = result;
    }
    **
     * ref值是一个函数话，那么此函数会在虚拟DOM转成真实DOM插入页面中之后执行，参数就是此真实DOM
     *
    render() {
        return (
            <div>
                <input ref={this.num1} />+<input ref={this.num2} /><button onClick={this.add}>=
                </button><input ref={this.result} />
            </div>
        )
    }
} */
/**
 * 如何引用一个类组件，获取一个类组件的实例 
 */
/***
class Username extends React.Component {
    constructor() {
        super();
        this.inputRef = React.createRef();//{current:null}
    }
    render() {
        return (
            <input ref={this.inputRef} />
        )
    }
}
class Form extends React.Component {
    constructor() {
        super();
        this.username = React.createRef();//{current:null}
    }
    getFocus = (event) => {
        this.username.current.inputRef.current.focus();
    }
    //this.username就是Username组件的实例 this.username.current = new Username().render(); ReactElement
    render() {
        return (
            <>
                <Username ref={this.username} />
                <button onClick={this.getFocus}>让用户名获得焦点</button>
            </>
        )
    }
}
 */
/**
 * 如何给函数组件添加ref
 * Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 */
function Username(props, ref) {
    return <input ref={ref} />
}

function forwardRef(functionComponent) {
    return class extends React.Component {
        render() {
            return functionComponent(this.props, this.props.ref2);
        }
    }
}
/*
function forwardRef(functionComponent) {
    return props => functionComponent(props, props.ref);
}
 */
const ForwardedUsername = forwardRef(Username);
class Form extends React.Component {
    constructor() {
        super();
        this.username = React.createRef();//{current:null}
    }
    getFocus = (event) => {
        this.username.current.focus();
    }
    //this.username就是Username组件的实例 this.username.current = new Username().render(); ReactElement
    render() {
        return (
            <>
                <ForwardedUsername ref2={this.username} />
                <button onClick={this.getFocus}>让用户名获得焦点</button>
            </>
        )
    }
}
ReactDOM.render(<Form />, document.getElementById('root'));
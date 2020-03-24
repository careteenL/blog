import React from 'react';
import ReactDOM from 'react-dom';
//从localStorage中加载数据 localStorage.getItem('username');  zhangsan
function loadFromLocal(AjaxUserName, name) {
    return class LocalUserName extends React.Component {
        state = { value: null }
        componentDidMount() {
            let value = localStorage.getItem(name);
            this.setState({ value });
        }
        render() {
            return <AjaxUserName value={this.state.value} />;
        }
    }
}
//接收一个属性里面放着英文名，然后通过调用远程服务器端接口，得到此英文名对应的中文名,再赋值给this.state.value
function loadFromAjax(LocalUserName) {
    return class AjaxUserName extends React.Component {
        state = { value: null }
        componentDidMount() {
            //let value = this.props.value;//从属性对象中获取value的值
            fetch('/translation.json').then(response => response.json()).then(data => {
                //data={"tom": "汤姆","jerry": "杰瑞"}
                this.setState({ value: data[this.props.value] });
            });
        }
        render() {
            return <LocalUserName value={this.state.value} />
        }
    }
}

const UserName = (props) => {
    return <input defaultValue={props.value} />
}
const AjaxUserName = loadFromAjax(UserName);
let LocalUserName = loadFromLocal(AjaxUserName, 'username');
ReactDOM.render(<div>
    <LocalUserName />
</div>, document.getElementById('root'));

/**
 *
 * hooks 实现逻辑复用的方式
 * 但是会比高阶组件优雅的多
 */
import React from 'react';
import ReactDOM from 'react-dom';
let ThemeContext = React.createContext();
let HeaderContext = React.createContext();
//一个组件什么时候会更新，是当属性或者状态发生变化的时候
function createContext(initialValue) {
    class Provider extends React.Component {
        static xx = initialValue;
        constructor(props) {
            super(props);
            //Provider.xx = props.value;
        }
        /*  componentWillReceiveProps(nextProps) {
             contextValue = nextProps.value;
         } */
        /* static getDerivedStateFromProps(nextProps, prevState) {
            Provider.xx = nextProps.value;
            return null;//返回值是新的状态对象  this.state
        } */
        render() {
            Provider.xx = this.props.value;
            console.log('Provider.render');
            return this.props.children;
        }
    }
    class Consumer extends React.Component {
        render() {
            return this.props.children(Provider.xx);
        }
    }
    return { Provider, Consumer };
}
//let ThemeContext = createContext(null);
/* class Title extends React.Component {
    static contextType = ThemeContext;
    constructor(props, context) {
        super(props);
        //context就代表上下文对象=ThemeContext.Provider.contextValue = this.context
        //在构造函数里，是不能通过this.context拿 到上下文对象的
        console.log('Title.constructor.context', context);
    }
    render() {
        //context是一个内部被保护的变量，所以不能直接赋值
        //this.context2 = Title.contextType.Provider.contextValue;
        console.log('Title.render.context', this.context);
        return (
            <div style={{ border: `5px solid ${this.context.color}` }}>
                Title
            </div>
        )
    }
} */

function Title() {
    return (
        <HeaderContext.Consumer>
            {
                value => {
                    console.log('Title', value);
                    return (<div>title</div>)
                }
            }
        </HeaderContext.Consumer>
    )
}
function Header(props) {
    //Consumer消费者，意思是我要消费上下文中的数据 Provider中的value
    return (
        <HeaderContext.Provider value={{ color: 'yellow', age: 10 }}>
            <div style={{ border: `5px solid yellow` }}>
                Header
                       <Title />
            </div>
        </HeaderContext.Provider>

    )
}

function Content(props) {
    //Consumer消费者，意思是我要消费上下文中的数据 Provider中的value
    return (
        <ThemeContext.Consumer>
            {
                (value) => (
                    <div style={{ border: `5px solid ${value.color}` }}>
                        Content
                        s<button onClick={() => value.changeColor('red')}>变红</button>
                        <button onClick={() => value.changeColor('green')}>变绿</button>
                    </div>
                )
            }
        </ThemeContext.Consumer>

    )
}

function Main(props) {
    //Consumer消费者，意思是我要消费上下文中的数据 Provider中的value
    return (
        <ThemeContext.Consumer>
            {
                (value) => (
                    <div style={{ border: `5px solid ${value.color}` }}>
                        Main
                       <Content />
                    </div>
                )
            }
        </ThemeContext.Consumer>

    )
}

class Panel extends React.Component {
    state = { color: 'green' }
    changeColor = (color) => {
        this.setState({ color });
    }
    render() {
        let value = { color: this.state.color, changeColor: this.changeColor };
        //Provider提供者，它负责向下层所有的组件提供数据value
        return (
            <ThemeContext.Provider value={value}>
                <div style={{ border: `5px solid ${this.state.color}`, width: 300 }}>
                    Panel
                    <Header />
                    <Main />
                </div>
            </ThemeContext.Provider>
        )
    }
}
ReactDOM.render(<Panel />, document.getElementById('root'));

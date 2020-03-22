import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 1. 代码会冗余
 * 2. 工作量大
 * 3. 逻辑耦合
 * 高阶组件是为了解决逻辑复用的问题
 * 如果包裹太多的话。就非常的复杂的
 * 
 */
function withLogger(OldComponent) {
    return class extends React.Component {
        componentWillMount() {
            this.start = Date.now();
        }
        componentDidMount() {
            console.log((Date.now() - this.start) + 'ms');
        }
        render() {
            return (
                <div>
                    <div>hello</div>
                    <OldComponent {...this.props} />
                    <div>world</div>
                </div>
            )
        }
    }
}
let LoggerApp = withLogger(App);
ReactDOM.render(<LoggerApp name='zhufeng' />, document.getElementById('root'));

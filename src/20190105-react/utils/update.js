/* 
let state = { number: 0 };
let updateQueue = [];
function setState(newState) {
    updateQueue.push(newState);
}

setState({ number: state.number + 1 });
setState({ number: state.number + 1 });
setState({ number: state.number + 1 });

updateQueue.forEach(newState => state = newState);
console.log(state);//{number:}
 */

class Component {
    constructor() {
        this.state = { name: 'zhufeng', number: 0 };
        this.batchUpdate = false;
        this.updateQueue = [];
        this.callbackQueue = [];
        let oldAdd = this.add;
        this.add = () => {
            this.batchUpdate = true;//开启批量更新模式
            oldAdd.apply(this, arguments);
            this.flushUpdate();
        }
    }
    setState(partialState, callback) {
        if (this.batchUpdate) {
            this.updateQueue.push(partialState);
            if (callback)
                this.callbackQueue.push(callback);
        } else {
            this.state = typeof partialState == 'function' ? partialState(this.state) : partialState
        }
    }
    forceUpdate() {
        //直接 render并且更新
        //当组件的属性和状态都没有改变的时候，我们也想更新

    }
    flushUpdate() {
        //this.updateQueue.forEach(newState => this.state = newState);
        //状态只能加不减 
        let state = this.state;
        for (let i = 0; i < this.updateQueue.length; i++) {
            let partialState = typeof this.updateQueue[i] == 'function' ? this.updateQueue[i](this.state) : this.updateQueue[i];
            state = { ...state, ...partialState };
        }
        this.state = state;
        this.callbackQueue.forEach(callback => callback());
        this.batchUpdate = false;
    }
    add() {
        setTimeout(() => {
            this.setState({ number: this.state.number + 3 });
            console.log(this.state);
            this.setState({ number: this.state.number + 5 });
            console.log(this.state);
        })
        // this.setState({ number: this.state.number + 1 });
        /* this.setState((previousState) => ({ number: previousState.number + 1 }), () => {
            console.log(1, this.state);
        });
        this.setState((previousState) => ({ number: previousState.number + 2 }), () => {
            console.log(2, this.state);
        });
        this.setState((previousState) => ({ number: previousState.number + 3 }), () => {
            console.log(3, this.state);
        }); */
        //this.setState({ number: this.state.number + 3 });
    }
}

let c = new Component();
c.add();
console.log(c.state);



let lastState;
function useState() {
    function setState(newState) {
        lastState = newState;
    }
    return [lastState, setState];
}
function App() {
    let [lastState, setState] = useState();
    setState(new Date().toLocaleString());

}


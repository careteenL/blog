import { push } from '../../connected-react-router';
//push其实是一个方法，用来生产一个action.
//是为了让我们可以在actions跳转路径
//router跳路径 1. Link 2. props.history.push
export default {
    go(to) {
        return push(to);
    }
}
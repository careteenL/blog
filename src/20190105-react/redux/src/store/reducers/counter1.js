import * as TYPES from '../action-types';
//Counter1组件的reducer, 这个状态是Counter1组件的状态
let initialState = { number: 0 };
export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.ADD1:
            return { number: state.number + 1 };
        case TYPES.MINUS1:
            return { number: state.number - 1 };
        default:
            return state;
    }
}